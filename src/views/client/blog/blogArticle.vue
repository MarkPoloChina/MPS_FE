<template>
  <div class="page-head" v-if="blog">
    <el-page-header @back="router.back()">
      <template #breadcrumb>
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: `/blog` }">
            首页
          </el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{ path: `/blog/tag/${tag.id}` }"
            v-for="tag in blog.tags"
          >
            {{ tag.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <template #content>
        <div class="mps-title">
          <span> {{ blog.title }} </span>
        </div>
      </template>
      <template #extra>
        <el-tag
          v-for="tag in blog.tags"
          :key="tag.id"
          style="margin: 5px"
          size="large"
        >
          {{ tag.name }}
        </el-tag>
      </template>

      <el-descriptions :column="1" size="large">
        <el-descriptions-item label="发布于">
          {{ new Date(blog.fileDate).toLocaleString() }}
        </el-descriptions-item>
      </el-descriptions>
      <el-image
        :src="getAListFileUrl(blog.imgTarget) ?? coverDefault"
        fit="contain"
      ></el-image>
    </el-page-header>
  </div>
  <div class="md-container" v-if="content">
    <div class="markdown-body" v-html="content"></div>
  </div>
</template>
<script setup lang="ts">
import { API } from "@/api";
import { BlogDto } from "@/ts/interface/blogDto";
import { onMounted, ref } from "vue";
import markdownit from "markdown-it";
import markdownitKatex from "markdown-it-katex";
import hljs from "highlight.js";
import { useRoute, useRouter } from "vue-router";
import coverDefault from "@/assets/img/90773916_p1.jpg";
import { getAListFileUrl } from "@/ts/util/path";

const route = useRoute();
const router = useRouter();

const content = ref("");
const md = markdownit({
  html: true,
  linkify: true,
  breaks: true,
  xhtmlOut: true,
  typographer: true,
  highlight: function (str, lang) {
    try {
      const preCode =
        lang && hljs.getLanguage(lang)
          ? hljs.highlight(str, {
              language: lang,
              ignoreIllegals: true,
            }).value
          : markdownit().utils.escapeHtml(str);
      const lines = preCode.split(/\n/).slice(0, -1);
      let html = lines
        .map((item, index) => {
          return (
            '<li><span class="line-num" data-line="' +
            (index + 1) +
            '"></span>' +
            item +
            "</li>"
          );
        })
        .join("");
      html = "<ol>" + html + "</ol>";
      if (lines.length && lang) {
        html += '<b class="name">' + lang + "</b>";
      }
      return '<pre class="hljs"><code>' + html + "</code></pre>";
    } catch (__) {}
    return "";
  },
}).use(markdownitKatex);
const blog = ref<BlogDto>();
async function getBlog() {
  const blogId = route.params.id;
  const res = await API.getBlogById(parseInt(blogId as string));
  blog.value = res;
  getMd(res.target);
}
function getMd(target: string) {
  API.getMd(import.meta.env.VITE_BASE_IHS_URL + target).then((res) => {
    content.value = md.render(
      prependImagePrefix(res, import.meta.env.VITE_BASE_IHS_URL + "/")
    );
  });
}
function prependImagePrefix(mdContent: string, prefix: string): string {
  const imageRegex = /!\[(.*?)\]\((.*?)\)/g;

  const updatedContent = mdContent.replace(imageRegex, (match, p1, p2) => {
    if (
      !p2.startsWith("http://") &&
      !p2.startsWith("https://") &&
      !p2.startsWith("data:")
    ) {
      return `![${p1}](${prefix}${p2})`;
    }
    return match;
  });

  return updatedContent;
}
onMounted(() => {
  getBlog();
});
</script>
<style lang="scss" scoped>
.md-container {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px 40px 20px 40px;
  border-radius: 10px;
  word-break: break-all;
  @media screen and (max-width: $pad-width) {
    padding: 20px 10px 20px 10px;
  }
}
.page-head {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  :deep(.el-descriptions__body) {
    background-color: transparent;
  }
  :deep(.el-image) {
    width: 100%;
    height: 300px;
    @media screen and (max-width: $pad-width) {
      height: 200px;
    }
  }
  .mps-title {
    font-weight: bold;
  }
}
</style>
