<template>
  <header class="mps-comp-client-header">
    <el-link class="mps-logo" @click="$router.push('/')" :underline="false">
      <img class="mps-logo-svg" src="@/assets/img/logo.svg" />
      <div class="mps-logo-text">MarkPoloSpace</div>
    </el-link>
    <el-menu
      mode="horizontal"
      :ellipsis="false"
      class="mps-menu"
      background-color="transparent"
      :default-active="activeIndex"
      router
    >
      <el-menu-item index="/" class="mps-menu-icon">
        <el-icon><house></house></el-icon
      ></el-menu-item>
      <el-menu-item index="/blog" class="mps-menu-icon">
        <el-icon><Document></Document></el-icon
      ></el-menu-item>
      <el-menu-item index="/illust" class="mps-menu-icon">
        <el-icon><picture-icon></picture-icon></el-icon>
      </el-menu-item>
      <el-menu-item index="/project" class="mps-menu-icon"
        ><el-icon><files></files></el-icon
      ></el-menu-item>
    </el-menu>
  </header>
</template>
<script setup lang="ts">
import {
  House,
  Document,
  Picture as PictureIcon,
  Files,
} from "@element-plus/icons-vue";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const activeIndex = ref("");
onMounted(() => {
  activeIndex.value = route.path.startsWith("/blog")
    ? "/blog"
    : route.path.startsWith("/illust")
    ? "/illust"
    : route.path.startsWith("/project")
    ? "/project"
    : route.path.startsWith("/")
    ? "/"
    : "";
});
watch(
  () => route.path,
  () => {
    activeIndex.value = route.path.startsWith("/blog")
      ? "/blog"
      : route.path.startsWith("/illust")
      ? "/illust"
      : route.path.startsWith("/project")
      ? "/project"
      : route.path.startsWith("/")
      ? "/"
      : "";
  },
);
</script>
<style lang="scss" scoped>
.mps-comp-client-header {
  width: calc(100% - 40px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: $bg-color-2;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 0 0 10px 10px;
  padding: 0 10px 0 30px;
  .mps-logo {
    user-select: none;
    .mps-logo-svg {
      width: 35px;
      height: 35px;
      padding: 3px;
    }
    .mps-logo-text {
      margin: 0 15px 0 15px;
      background: linear-gradient(
        to bottom right,
        $theme-main-color-1,
        $theme-main-color-3
      );
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      white-space: nowrap;
      font-size: 30px;
      font-family: "Raleway";
      font-weight: 600;
    }
    @media screen and (max-width: $mobile-width) {
      .mps-logo-text {
        display: none;
      }
    }
  }
  .mps-menu {
    height: 50px;
    .mps-menu-icon {
      i {
        font-size: 30px;
        margin: 0;
      }
    }
  }
}
</style>
