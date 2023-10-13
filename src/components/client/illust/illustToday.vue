<template>
  <div class="mps-illust-pictd" v-if="currentIT">
    <a ref="downloadLink" style="display: none"></a>
    <div class="mps-illust-pictd-info-container">
      <div class="mps-illust-pictd-title">
        Illust Today
        <br />
        <span>{{ currentIT.date }}</span>
      </div>
      <div class="mps-illust-info">
        <div class="mps-illust-info-line">
          <div class="mps-illust-info-line-content">
            {{ currentIT.type }}
          </div>
          <div class="mps-illust-info-line-content" v-if="currentIT.pid">
            {{ currentIT.pid }}
          </div>
        </div>
        <div class="mps-illust-info-line">
          <div class="mps-illust-info-line-content" v-if="currentIT.char">
            <el-tag effect="dark">{{ currentIT.char }}</el-tag>
          </div>
          <div class="mps-illust-info-line-content" v-if="currentIT.tags">
            <el-tag effect="dark" v-for="tag in currentIT.tags" :key="tag">{{
              tag
            }}</el-tag>
          </div>
        </div>
        <div class="mps-illust-info-line">
          <div class="mps-illust-info-line-content">
            <el-link
              class="handle-el-link"
              :href="currentIT.url"
              target="_blank"
              >{{ currentIT.url }}</el-link
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
      >
      </el-image>
      <div class="mps-illust-pictd-func">
        <div>
          <el-button :icon="ArrowLeft" circle @click="handleGetPre" />
        </div>
        <div>
          <el-button :icon="ArrowRight" circle @click="handleGetNext" />
        </div>
        <div>
          <el-button type="info" :icon="Calendar" circle />
        </div>
        <div>
          <el-button type="primary" :icon="Share" circle />
        </div>
        <div>
          <el-button
            type="success"
            :icon="Download"
            circle
            @click="handleDownload(currentIT.url)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Share,
  Download,
} from "@element-plus/icons-vue";
import { API } from "@/api";
import { ElMessage } from "element-plus";
import { IllustTodayObj } from "@/ts/interface/illustTodayObj";
import { IllustTodayDto } from "@/ts/interface/illustTodayDto";
const downloadLink = ref<HTMLAnchorElement>();
const currentIT = ref<IllustTodayObj>();
const isLoading = ref(true);
const isImageLoading = ref(true);
// const currentDate = ref('')
onMounted(() => {
  getIllustTodayLatest();
});
// const getDate = (date: string) => {
//   const str = new Date(date).toISOString();
//   const _date = new Date(str.replace("Z", "-08:00"));
//   return _date.toISOString().slice(0, 10).replace(/[-]/g, "-");
// };
// const getIllustTodayFor = (date: string) => {
//   API.getIllustToday(date).then((resp) => {
//     currentIT.value = parseObj(resp);
//   });
// };
const getIllustTodayLatest = async () => {
  const obj = await API.getIllustTodayLatest();
  // currentDate.value = getDate(obj.date)
  currentIT.value = parseObj(obj);
  isLoading.value = false;
};
const parseObj = (dto: IllustTodayDto) => {
  isImageLoading.value = true;
  const obj: IllustTodayObj = {
    url:
      dto.type == "pixiv"
        ? `https://pixiv.re/${dto.target}.jpg`
        : `https://alist.markpolo.cn/d${dto.target}`,
    pid: dto.type == "pixiv" ? dto.target.split("-")[0] : "",
    tags: dto.tags ? dto.tags.split(",") : [],
    date: dto.date,
    type: dto.type,
    char: dto.char,
  };
  return obj;
};
const handleGetNext = async () => {
  try {
    isLoading.value = true;
    const obj = await API.getIllustTodayNext(currentIT.value!.date);
    if (!obj) {
      ElMessage.error("没有后一张");
      return;
    }
    currentIT.value = parseObj(obj);
  } catch {
    ElMessage.error("网络错误");
  } finally {
    isLoading.value = false;
  }
};
const handleGetPre = async () => {
  try {
    isLoading.value = true;
    const obj = await API.getIllustTodayPre(currentIT.value!.date);
    if (!obj) {
      ElMessage.error("没有前一张");
      return;
    }
    currentIT.value = parseObj(obj);
  } catch {
    ElMessage.error("网络错误");
  } finally {
    isLoading.value = false;
  }
};
const handleDownload = (url: string) => {
  if (url) {
    downloadLink.value?.setAttribute("href", url);
    downloadLink.value?.click();
  }
};
</script>
<style lang="scss" scoped>
.mps-illust-pictd {
  position: relative;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;

  .mps-illust-pictd-img-container {
    padding: 10px;
    position: relative;
    display: flex;
    height: 500px;

    .mps-illust-pictd-img {
      border-radius: 20px;
      flex: auto;
    }

    .mps-illust-pictd-func {
      padding: 0 20px 0 10px;
      flex: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      div + div {
        margin-top: 10px;
      }
    }
  }

  .mps-illust-pictd-info-container {
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20px;

    .mps-illust-pictd-title {
      // display: inline-block;
      flex: auto;
      font-family: "Raleway";
      text-align: center;
      font-size: 5vw;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      span {
        font-size: 3vw;
        font-weight: 300;
      }
    }

    .mps-illust-info {
      // display: inline-block;
      width: 60%;

      .mps-illust-info-line {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 15px 0 15px 0;

        .mps-illust-info-line-content {
          font-family: "Raleway";
          font-size: 2vw;
          font-weight: 300;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;

          .el-tag {
            margin: 5px 10px 5px 0;
          }
        }
      }
    }
  }
}
</style>
