<script setup lang="ts">
import { API } from "@/api";
import coverDefault from "@/assets/img/90773916_p1.jpg";
import type { BlogDto } from "@/ts/interface/blogDto";
import type { TagDto } from "@/ts/interface/tagDto";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const blogs = ref<BlogDto[]>([]);
const currentTag = ref<TagDto>();
const router = useRouter();
const route = useRoute();
onMounted(() => {
  getTag();
  getBlogsUnderTag();
});
async function getBlogsUnderTag() {
  const tagId = route.params.id;
  const res = await API.getBlogUnderTag(parseInt(tagId as string));
  blogs.value = res;
}
async function getTag() {
  const tagId = route.params.id;
  const res = await API.getTag(parseInt(tagId as string));
  currentTag.value = res;
}
const tagChain = computed(() => {
  const chain = [];
  let tag = currentTag.value;
  while (tag) {
    chain.unshift(tag);
    tag = tag.parent;
  }
  return chain;
});
</script>
<template>
  <div class="mps-page-head">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: `/blog` }"> Blog </el-breadcrumb-item>
      <el-breadcrumb-item
        :to="{ path: `/blog/tag/${tag.id}` }"
        v-for="tag in tagChain"
        :key="tag.id"
      >
        {{ tag.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="mps-articles">
    <div
      v-for="blog in blogs"
      :key="blog.id"
      class="mps-article-box"
      @click="router.push(`/blog/article/${blog.id}`)"
    >
      <el-image
        :src="coverDefault"
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
.mps-page-head {
  border-radius: 10px;
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
}
.mps-articles {
  width: calc(100% - 20px);
  position: relative;
  border-radius: 20px;
  background-color: white;
  padding: 20px 10px;
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
