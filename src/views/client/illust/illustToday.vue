<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Sunrise,
} from "@element-plus/icons-vue";
import { API } from "@/api";
import { ElMessage } from "element-plus";
import type { IllustTodayObj } from "@/ts/interface/illustTodayObj";
import type { IllustTodayDto } from "@/ts/interface/illustTodayDto";
import { useRoute, useRouter } from "vue-router";
import type { RemoteBaseDto } from "@/ts/interface/remoteBaseDto";
import { getDateCST } from "@/ts/util";
const downloadLink = ref<HTMLAnchorElement>();
const currentIT = ref<IllustTodayObj>();
const isImageLoading = ref(true);
const route = useRoute();
const router = useRouter();
const validDates = ref<string[]>([]);
onMounted(() => {});

const getValidDates = async () => {
  const res = await API.getIllustTodayValid(0, -1);
  validDates.value = res;
};

const getIllustTodayFor = async (date: string) => {
  try {
    const obj = await API.getIllustToday(date);
    const rb = await API.getRemoteBase(obj.type);
    currentIT.value = parseObj(obj, rb);
  } catch {
    router
      .replace({
        name: "illustToday",
        params: { date: "latest" },
      })
      .then(() => {
        ElMessage.error("date格式错误或不存在");
      });
  }
};
const initIllust = () => {
  getValidDates();
  if (route.params.date === "latest") getIllustTodayLatest();
  else getIllustTodayFor(route.params.date as string);
};
const getIllustTodayLatest = async () => {
  const obj = await API.getIllustTodayLatest();
  if (obj) router.replace({ name: "illustToday", params: { date: obj.date } });
};
const parseObj = (dto: IllustTodayDto, rbdto: RemoteBaseDto) => {
  if (!currentIT.value || currentIT.value.date !== dto.date)
    isImageLoading.value = true;
  const obj: IllustTodayObj = {
    url: rbdto.target.startsWith("/")
      ? `${import.meta.env.VITE_BASE_IT_URL}${rbdto.target}/${dto.target.replace(/^\//, '')}`
      : `${rbdto.target}/${dto.target}.jpg`,
    tags: dto.tags ? dto.tags.split(",") : [],
    date: dto.date,
    type: dto.type,
    char: dto.char,
    source: dto.source,
  };
  return obj;
};
const handleGetNext = async () => {
  try {
    const obj = await API.getIllustTodayNext(currentIT.value!.date);
    if (!obj) {
      ElMessage.error("没有后一张");
      return;
    }
    router.push({ name: "illustToday", params: { date: obj.date } });
  } catch {
    ElMessage.error("网络错误");
  }
};
const handleGetPre = async () => {
  try {
    const obj = await API.getIllustTodayPre(currentIT.value!.date);
    if (!obj) {
      ElMessage.error("没有前一张");
      return;
    }
    router.push({ name: "illustToday", params: { date: obj.date } });
  } catch {
    ElMessage.error("网络错误");
  }
};
const handleGetLatest = async () => {
  router.push({ name: "illustToday", params: { date: "latest" } });
};
const handleDownload = (url: string) => {
  if (url) {
    downloadLink.value?.setAttribute("href", url);
    downloadLink.value?.click();
  }
};
watch(
  () => route.params.date,
  () => {
    if (route.path.startsWith("/illust")) initIllust();
  },
  {
    immediate: true,
  },
);
const currentDate = computed({
  get: () => {
    return currentIT.value?.date || "";
  },
  set: (val) => {
    if (val) {
      router.push({ name: "illustToday", params: { date: val } });
    }
  },
});
</script>
<template>
  <div class="mps-illust-pictd" v-if="currentIT">
    <a ref="downloadLink" style="display: none"></a>
    <div class="mps-illust-pictd-info-container">
      <div class="mps-illust-pictd-title">
        Illust Today
        <br />
        <span>{{ currentIT.date }}</span>
        <el-date-picker
            style="margin: 10px 0"
            v-model="currentDate"
            value-format="YYYY-MM-DD"
            type="date"
            placeholder="Pick a day"
            :disabled-date="(date: Date) => !validDates.includes(getDateCST(date, '-'))"
          />
      </div>
      <div class="mps-illust-info">
        <div class="mps-illust-info-line">
          <div class="mps-illust-info-line-content">
            {{ currentIT.type }}
          </div>
        </div>
        <div class="mps-illust-info-line">
          <div class="mps-illust-info-line-content" v-if="currentIT.char">
            <el-tag effect="dark">{{ currentIT.char }}</el-tag>
          </div>
          <div class="mps-illust-info-line-content tags" v-if="currentIT.tags">
            <el-tag effect="dark" v-for="tag in currentIT.tags" :key="tag">{{
              tag
            }}</el-tag>
          </div>
        </div>
        <div class="mps-illust-info-line">
          <div class="mps-illust-info-line-content">
            <el-link
              class="handle-el-link"
              :href="currentIT.source"
              target="_blank"
              >{{ currentIT.source }}</el-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="mps-illust-pictd-img-container">
      <el-image
        v-loading="isImageLoading"
        class="mps-illust-pictd-img"
        :src="currentIT.url"
        :preview-src-list="[currentIT.url]"
        fit="contain"
        @load="isImageLoading = false"
        preview-teleported
      >
      </el-image>
      <div class="mps-illust-pictd-func">
        <div>
          <el-button
            :icon="Sunrise"
            circle
            @click="handleGetLatest"
            size="large"
          />
        </div>
        <div>
          <el-button
            :icon="ArrowLeft"
            circle
            @click="handleGetPre"
            size="large"
          />
        </div>
        <div>
          <el-button
            :icon="ArrowRight"
            circle
            @click="handleGetNext"
            size="large"
          />
        </div>
        <div>
          <el-button
            type="primary"
            :icon="Download"
            circle
            @click="handleDownload(currentIT.url)"
            size="large"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="mps-illust-pictd">
    <el-skeleton animated style="height: 500px">
      <template #template>
        <el-skeleton-item
          variant="rect"
          style="height: 100%; border-radius: 20px"
        />
      </template>
    </el-skeleton>
  </div>
</template>
<style lang="scss" scoped>
.mps-illust-pictd {
  position: relative;
  background-color: $bg-color-1;
  border-radius: 20px;
  margin: 0 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: $mobile-width) {
    margin: 0;
  }

  .mps-illust-pictd-img-container {
    padding: 10px;
    position: relative;
    display: flex;
    height: calc(100vh - 200px);
    flex-direction: column-reverse;
    @media screen and (max-width: $mobile-width) {
      height: auto;
    }

    .mps-illust-pictd-img {
      flex: auto;
    }

    .mps-illust-pictd-func {
      padding: 0;
      flex: none;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 20px 0;
      @media screen and (max-width: $mobile-width) {
        margin: 0;
      }

      div {
        margin: 10px;
      }
    }
  }

  .mps-illust-pictd-info-container {
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: $bg-color-2;
    border-radius: 20px;
    @media screen and (max-width: $mobile-width) {
      flex-direction: column;
    }

    .mps-illust-pictd-title {
      // display: inline-block;
      flex: auto;
      font-family: "Raleway";
      text-align: center;
      font-size: 2.5rem;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 10px 20px;
      flex: none;

      span {
        font-size: 2rem;
        font-weight: 300;
      }
    }

    .mps-illust-info {
      // display: inline-block;
      word-wrap: break-word;
      word-break: break-word;
      margin: 10px;
      flex: auto;
      overflow: hidden;

      .mps-illust-info-line {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 15px 0 15px 0;
        @media screen and (max-width: $mobile-width) {
          flex-direction: column;
          margin: 5px 0 5px 0;
          .tags {
            display: none;
          }
        }

        .mps-illust-info-line-content {
          font-family: "Raleway";
          font-size: 1.5rem;
          font-weight: 300;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          @media screen and (max-width: $mobile-width) {
            &.tags {
              display: none;
            }
          }

          .el-tag + .el-tag {
            margin: 5px 0 5px 10px;
          }
        }
      }
    }
  }
}
</style>
