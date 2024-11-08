<script setup lang="ts">
import coverDefault from "@/assets/img/53061497_p0.jpg";
import { getAListFileUrl } from "@/ts/util/path";
import { useRouter } from "vue-router";
import type { BlogDto } from "@/ts/interface/blogDto";

defineProps({
  blogs: Array<BlogDto>,
});
const router = useRouter();
</script>
<template>
  <div class="mps-articles">
    <div
      v-for="blog in blogs"
      :key="blog.id"
      class="mps-article-box"
      @click="router.push(`/blog/article/${blog.id}`)"
    >
      <el-image
        :src="getAListFileUrl(blog.imgTarget) ?? coverDefault"
        fit="cover"
        class="mps-article-box-img"
        :class="[blog.imgTarget ? '' : 'hide']"
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
    position: relative;
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
      border-radius: 10px;
      @media screen and (max-width: $pad-width) {
        position: absolute;
        z-index: -1;
        height: calc(100% - 10px);
        width: 100%;
        margin: 5px 0;
        border-radius: 10px;
        &.hide {
          display: none;
        }
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
        @media screen and (max-width: $mobile-width) {
          font-size: 1.8rem;
        }
      }
      .mps-article-box-date {
        font-size: 1rem;
        @media screen and (max-width: $mobile-width) {
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>
