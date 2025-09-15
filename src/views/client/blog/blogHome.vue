<script setup lang="ts">
import { API } from "@/api";
import coverDefault from "@/assets/img/53061497_p0.jpg";
import type { BlogDto } from "@/ts/interface/blogDto";
import { getAListFileUrl } from "@/ts/util/path";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ArticleList from "@/components/client/blog/articleList.vue";
import { autoLoad } from "@/ts/util";
import { parseMetadataTags } from "@/ts/util/metadata";
const latestBlogs = ref<BlogDto[]>([]);
const router = useRouter();
const renderSize = 20;
const renderPage = ref(0);
const renderEnd = ref(false);
defineEmits(["toc"]);

onMounted(() => {
  autoLoad(loadMore);
  getLatest();
});
async function getLatest() {
  renderPage.value = 0;
  renderEnd.value = false;
  const res = await API.getLatestBlogs(
    renderSize,
    renderPage.value * renderSize,
  );
  latestBlogs.value = res;
  if (res.length) renderPage.value++;
  else renderEnd.value = true;
}
async function loadMore() {
  if (renderEnd.value) return;
  const res = await API.getLatestBlogs(
    renderSize,
    renderPage.value * renderSize,
  );
  if (res.length) {
    latestBlogs.value.push(...res);
    renderPage.value++;
  } else renderEnd.value = true;
}
const latestBlog = computed(() => {
  return latestBlogs.value[0] ?? null;
});
</script>
<template>
  <div
    class="mps-top-article"
    :style="{
      backgroundImage: `url(${getAListFileUrl(latestBlog.imgTarget, latestBlog.target) ?? coverDefault})`,
    }"
    v-if="latestBlog"
  >
    <div
      class="mps-top-article-text"
      @click="router.push(`/blog/article/${latestBlog.id}`)"
    >
      <div class="mps-top-article-title">
        <div class="title">{{ latestBlog.title }}</div>
      </div>
      <div class="mps-top-article-btm">
        <div class="mps-top-article-date">
          发布于{{ new Date(latestBlog.uploadTime).toLocaleString() }}
        </div>
        <div class="mps-top-article-tag">
          <el-tag effect="dark" style="margin: 5px">
            {{
              latestBlog.tags
                .sort((a, b) => a.level - b.level)
                .map((tag) => tag.name)
                .join(" / ")
            }}
          </el-tag>
          <el-tag
            v-for="tag in parseMetadataTags(latestBlog.metaJson)"
            :key="tag"
            style="margin: 5px"
          >
            {{ tag }}
          </el-tag>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="mps-top-article">
    <el-skeleton animated style="height: 100%">
      <template #template>
        <el-skeleton-item
          variant="rect"
          style="height: 100%; border-radius: 20px"
        />
      </template>
    </el-skeleton>
  </div>
  <ArticleList :blogs="latestBlogs.slice(1)" :render-end="renderEnd" />
  <div id="eop"></div>
</template>
<style lang="scss" scoped>
.mps-top-article {
  width: 100%;
  height: 400px;
  position: relative;
  border-radius: 20px;
  background-position: center;
  background-size: cover;
  @media screen and (max-width: $pad-width) {
    height: 250px;
  }
  .mps-top-article-text {
    width: calc(100% - 50px);
    height: 150px;
    padding: 10px 25px;
    position: absolute;
    bottom: 0;
    display: flex;
    border-radius: 0 0 20px 20px;
    flex-direction: column;
    justify-content: space-around;
    color: white;
    background-color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
    @media screen and (max-width: $pad-width) {
      height: auto;
      padding: 10px;
      width: calc(100% - 20px);
    }
    .mps-top-article-title {
      font-size: 2.2rem;
      font-weight: bold;
      margin: 10px 0;
      @media screen and (max-width: $pad-width) {
        margin: 2px 0;
      }
      .title {
        font-weight: bold;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .mps-top-article-btm {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .mps-top-article-date {
        font-size: 1.3rem;
        margin: 10px 0;
        @media screen and (max-width: $pad-width) {
          margin: 2px 0;
        }
      }
      .mps-top-article-tag {
        margin: 10px 0;
      }
    }
  }
}
</style>
