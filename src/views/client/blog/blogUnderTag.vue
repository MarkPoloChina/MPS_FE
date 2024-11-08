<script setup lang="ts">
import { API } from "@/api";
import type { BlogDto } from "@/ts/interface/blogDto";
import type { TagDto } from "@/ts/interface/tagDto";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ArticleList from "@/components/client/blog/articleList.vue";

const blogs = ref<BlogDto[]>([]);
const currentTag = ref<TagDto>();
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
  <ArticleList :blogs="blogs" />
</template>
<style lang="scss" scoped>
.mps-page-head {
  border-radius: 10px;
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
}
</style>
