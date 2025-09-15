<script setup lang="ts">
import { API } from "@/api";
import type { TagDto } from "@/ts/interface/tagDto";
import { onMounted, ref } from "vue";
import TagTree from "@/components/client/blog/tagTree.vue";
import { useRouter } from "vue-router";
import { Link, Collection } from "@element-plus/icons-vue";
const tags = ref<TagDto[]>([]);
const router = useRouter();
onMounted(() => {
  getTags();
});
async function getTags() {
  const res = await API.getTags();
  tags.value = res;
}
const drawerVisible = ref(false);
const drawerVisible2 = ref(false);
function scrollToc(e: MouseEvent) {
  if (!(e.target instanceof HTMLElement)) return;
  const target = e.target.closest("span[data-id]") as HTMLElement;
  if (target) {
    const id = target.dataset.id;
    const el = document.getElementById(id!);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
}
const toc = ref("");
</script>
<template>
  <div>
    <div class="mps-topimg">
      <div class="mps-topimg-text">
        <div class="bg"></div>
        <div class="tx">Blog</div>
      </div>
    </div>
    <div class="mps-blog-container">
      <div class="center-side">
        <div class="mps-hide-tag-menu-container">
          <el-button type="primary" @click="drawerVisible = true">
            <el-icon><Link /> </el-icon>
          </el-button>
          <el-button type="primary" @click="drawerVisible2 = true" v-if="toc">
            <el-icon><Collection /> </el-icon>
          </el-button>
        </div>
        <RouterView
          :key="router.currentRoute.value.fullPath"
          @toc="
            (t: string) => {
              toc = t;
            }
          "
        />
      </div>
      <div class="right-side">
        <div class="mps-tag-menu-container">
          <el-menu>
            <el-menu-item :index="'index'" @click="router.push(`/blog`)">
              <template #title>首页</template>
            </el-menu-item>
            <tag-tree :tag="tag" v-for="tag in tags" :key="tag.id" />
          </el-menu>
        </div>
        <div class="mps-toc-container" v-if="toc">
          <span class="markdown-toc-title">TOC</span>
          <div class="markdown-toc" v-html="toc" @click="scrollToc"></div>
        </div>
      </div>
    </div>
    <el-drawer
      v-model="drawerVisible"
      direction="rtl"
      size="100%"
      title="INDEX"
      append-to-body
      class="mps-drawer"
    >
      <div class="mps-drawer-tag-menu-container">
        <el-menu>
          <el-menu-item
            :index="'index'"
            @click="
              router.push(`/blog`);
              drawerVisible = false;
            "
          >
            <template #title>首页</template>
          </el-menu-item>
          <tag-tree
            :tag="tag"
            v-for="tag in tags"
            :key="tag.id"
            @menu-click="drawerVisible = false"
          />
        </el-menu>
      </div>
    </el-drawer>
    <el-drawer
      v-if="toc"
      v-model="drawerVisible2"
      direction="ltr"
      size="100%"
      title="TOC"
      append-to-body
      class="mps-drawer"
    >
      <div class="markdown-toc" v-html="toc" @click="scrollToc"></div>
    </el-drawer>
  </div>
</template>
<style lang="scss" scoped>
.bg {
  background-position: 50% 40%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("@/assets/img/53061497_p0.jpg");
}
.tx {
  color: white;
  background-color: $color-stdblue-1;
}
.mps-blog-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 200px;
  @media screen and (max-width: $large-desktop-width) {
    padding: 20px 100px;
  }
  @media screen and (max-width: $desktop-width) {
    padding: 20px 50px;
  }
  @media screen and (max-width: $pad-width) {
    padding: 20px 20px;
  }
  @media screen and (max-width: $mobile-width) {
    padding: 20px 10px;
  }
  .center-side {
    width: 100%;
    overflow: hidden;
    @media screen and (max-width: $mobile-width) {
      width: 100%;
    }
    .mps-hide-tag-menu-container {
      display: none;
      @media screen and (max-width: $mobile-width) {
        margin: 0 10px;
        width: calc(100% - 20px);
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
    }
  }
  .right-side {
    width: 20%;
    max-width: 300px;
    flex-shrink: 0;
    @media screen and (max-width: $mobile-width) {
      display: none;
    }
    .mps-tag-menu-container {
      margin-left: 10px;
      border-radius: 10px;
      background-color: white;
      padding: 10px 0;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
    }
    .el-menu {
      background-color: transparent;
      border: none;
    }
    .mps-toc-container {
      margin-left: 10px;
      border-radius: 10px;
      background-color: white;
      padding: 10px 10px;
      margin-top: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      .markdown-toc-title {
        font-weight: bold;
        font-size: 1.2rem;
        margin-bottom: 5px;
        display: block;
        text-align: center;
      }
      .markdown-toc {
        max-height: calc(100vh - 60px);
        overflow-y: auto;
      }
    }
  }
}
</style>
