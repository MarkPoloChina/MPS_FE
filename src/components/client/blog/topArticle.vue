<script setup lang="ts">
import { API } from "@/api";
import coverDefault from "@/assets/img/90773916_p1.jpg";
import { BlogDto } from "@/ts/interface/blogDto";
import { getAListFileUrl } from "@/ts/util/path";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const latestBlogs = ref<BlogDto[]>([]);
const router = useRouter();
onMounted(() => {
  getLatest();
});
async function getLatest() {
  const res = await API.getLatestBlogs();
  latestBlogs.value = res;
}
const latestBlog = computed(() => {
  return latestBlogs.value[0] ?? null;
});
</script>
<template>
  <div
    class="mps-top-article"
    :style="{ backgroundImage: `url(${getAListFileUrl(latestBlog.imgTarget) ?? coverDefault})` }"
    v-if="latestBlog"
  >
    <div class="mps-top-article-text">
      <div class="mps-top-article-title">
        <el-link
          class="handle-el-link"
          @click="router.push(`/blog/article/${latestBlog.id}`)"
          >{{ latestBlog.title }}</el-link
        >
      </div>
      <div class="mps-top-article-date">
        发布于{{ new Date(latestBlog.fileDate).toLocaleString() }}
      </div>
      <div class="mps-top-article-tag">
        <el-tag
          v-for="tag in latestBlog.tags"
          :key="tag.id"
          effect="dark"
          style="margin: 5px"
        >
          {{ tag.name }}
        </el-tag>
      </div>
    </div>
  </div>
  <div class="mps-articles">
    <div
      v-for="blog in latestBlogs.slice(1)"
      class="mps-article-box"
      @click="router.push(`/blog/article/${blog.id}`)"
    >
      <el-image
        :src="getAListFileUrl(blog.imgTarget) ?? coverDefault"
        fit="cover"
        class="mps-article-box-img"
      ></el-image>
      <div class="mps-article-box-info">
        <div class="mps-article-box-title">
          {{ blog.title }}
        </div>
        <div>
          <el-tag v-for="tag in blog.tags" :key="tag.id" style="margin: 5px">
            {{ tag.name }}
          </el-tag>
        </div>
        <div class="mps-article-box-date">
          发布于{{ new Date(blog.fileDate).toLocaleString() }}
        </div>
      </div>
    </div>
  </div>
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
    height: 200px;
    padding: 10px 25px;
    position: absolute;
    bottom: 0;
    display: flex;
    border-radius: 0 0 20px 20px;
    flex-direction: column;
    justify-content: space-around;
    color: white;
    background-color: rgba(0, 0, 0, 0.7);
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
      .handle-el-link {
        font-weight: bold;
        &:hover {
          color: white;
          &:after {
            border-bottom: 1px solid white;
          }
        }
      }
    }
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
.mps-articles {
  width: calc(100% - 20px);
  position: relative;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px 10px;
  margin-top: 25px;
  .mps-article-box {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
    & + .mps-article-box {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
    .mps-article-box-img {
      height: 120px;
      width: 200px;
      margin: 0 20px;
      flex: none;
      @media screen and (max-width: $pad-width) {
        display: none;
      }
    }
    .mps-article-box-info {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      height: calc(100% - 20px);
      width: calc(100% - 20px);
      padding: 10px;
      overflow: hidden;

      .mps-article-box-title {
        font-size: 1.6rem;
        font-weight: bold;
        margin: 10px 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .mps-article-box-date {
        font-size: 1rem;
      }
    }
  }
}
</style>
