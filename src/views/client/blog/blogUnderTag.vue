<script setup lang="ts">
import { API } from "@/api";
import type { BlogDto } from "@/ts/interface/blogDto";
import type { TagDto } from "@/ts/interface/tagDto";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ArticleList from "@/components/client/blog/articleList.vue";
import { autoLoad } from "@/ts/util";

defineEmits(["toc"]);
const blogs = ref<BlogDto[]>([]);
const currentTag = ref<TagDto>();
const route = useRoute();
const renderSize = 20;
const renderPage = ref(0);
const renderEnd = ref(false);
onMounted(() => {
  autoLoad(loadMore);
  getTag();
  getBlogsUnderTag();
});
async function getBlogsUnderTag() {
  renderPage.value = 0;
  renderEnd.value = false;
  const tagId = route.params.id;
  const res = await API.getBlogUnderTag(
    parseInt(tagId as string),
    renderSize,
    renderPage.value * renderSize,
  );
  blogs.value = res;
  if (res.length) renderPage.value++;
  else renderEnd.value = true;
}
async function loadMore() {
  if (renderEnd.value) return;

  const tagId = route.params.id;
  const res = await API.getBlogUnderTag(
    parseInt(tagId as string),
    renderSize,
    renderPage.value * renderSize,
  );
  if (res.length) {
    blogs.value.push(...res);
    renderPage.value++;
  } else renderEnd.value = true;
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
  <div id="eop"></div>
</template>
<style lang="scss" scoped>
.mps-page-head {
  border-radius: 10px;
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
}
</style>
