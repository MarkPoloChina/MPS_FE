<script setup lang="ts">
import { API } from "@/api";
import type { BlogDto } from "@/ts/interface/blogDto";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAListFileUrl } from "@/ts/util/path";
import { render, getTOCHtml } from "@/ts/util/markdown";
import { parseMetadataList, parseMetadataTags } from "@/ts/util/metadata";

const route = useRoute();
const router = useRouter();
const emit = defineEmits(["toc"]);

const content = ref("");
const blog = ref<BlogDto>();
async function getBlog() {
  const blogId = route.params.id;
  const res = await API.getBlogById(parseInt(blogId as string));
  blog.value = res;
  getMd(res.target);
}
function getMd(target: string) {
  API.getMd(import.meta.env.VITE_BASE_BLOGS_URL + target).then(async (res) => {
    content.value = await render(res, target);
    emit("toc", getTOCHtml());
  });
}
onMounted(() => {
  getBlog();
});
onUnmounted(() => {
  emit("toc", "");
});
</script>
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
            :key="tag.id"
          >
            {{ tag.name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item
          >
            {{ blog?.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <template #content>
        <div class="mps-title">
          <span> {{ blog.title }} </span>
        </div>
      </template>
      <template #extra>
        <el-tag style="margin: 5px" size="large" effect="dark">
          {{
            blog.tags
              .sort((a, b) => a.level - b.level)
              .map((tag) => tag.name)
              .join(" / ")
          }}
        </el-tag>
        <el-tag
          v-for="tag in parseMetadataTags(blog.metaJson)"
          :key="tag"
          style="margin: 5px"
          size="large"
        >
          {{ tag }}
        </el-tag>
      </template>

      <el-descriptions :column="1" border style="margin: 10px 0">
        <el-descriptions-item
          :label="meta.key"
          v-for="meta in parseMetadataList(blog.metaJson, true)"
          :key="meta.key"
        >
          {{ meta.value }}
        </el-descriptions-item>
      </el-descriptions>
      <el-image
        v-if="blog.imgTarget"
        :src="getAListFileUrl(blog.imgTarget, blog.target)!"
        fit="contain"
      ></el-image>
    </el-page-header>
  </div>
  <div class="md-container" v-if="content">
    <div class="markdown-body" v-html="content"></div>
    <div class="mps-article-renderend">END OF PAGE</div>
  </div>
</template>
<style lang="scss" scoped>
.md-container {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px 40px 20px 40px;
  border-radius: 10px;
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
    font-size: 1.5rem;
  }

  @media screen and (max-width: $pad-width) {
    :deep(.el-page-header__header) {
      flex-direction: column;
      .el-page-header__left {
        margin-right: 0;
      }
      .el-page-header__extra {
        margin-top: 10px;
      }
    }
  }
}
</style>
