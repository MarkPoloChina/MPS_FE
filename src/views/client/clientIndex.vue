<script setup lang="ts">
import Live2d from "@/components/client/live2dModule.vue";
import {
  House,
  Document,
  Picture as PictureIcon,
  Files,
} from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { API } from "@/api";
import packageJson from "@/../package.json";
import { onMounted, ref } from "vue";

const route = useRoute();
const router = useRouter();

const FE_UPDATE = import.meta.env.VITE_FE_UPDATE;
const FE_VERSION = packageJson.version;
const BE_UPDATE = ref("-");
const BE_VERSION = ref("-");

onMounted(() => {
  API.getDate().then((date) => {
    BE_UPDATE.value = date;
  });
  API.getVersion().then((version) => {
    BE_VERSION.value = version;
  });
});
</script>
<template>
  <div class="mps-view-client">
    <header class="mps-comp-client-header">
      <el-link class="mps-logo" @click="router.push('/')" :underline="false">
        <img class="mps-logo-svg" src="@/assets/img/logo.svg" />
        <div class="mps-logo-text">MarkPoloSpace</div>
      </el-link>
      <el-menu
        mode="horizontal"
        :ellipsis="false"
        class="mps-menu"
        background-color="transparent"
        :default-active="`/${route.path.split('/')[1]}`"
        @select="(item: string) => router.push(item)"
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
    <div class="mps-view-client-main">
      <router-view />
    </div>
    <footer class="mps-comp-client-footer">
      <div class="mps-footer-row">
        <img src="@/assets/img/logo.svg" style="height: 50px" />
      </div>
      <div class="mps-footer-row beian-row">
        <div class="mps-footer-inline">
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            class="handle-default-a"
            >闽ICP备2020022020号-2</a
          >
        </div>
        <div class="mps-footer-inline">
          <img
            src="@/assets/img/beian.png"
            style="width: 22.5px; vertical-align: middle; margin-right: 5px"
          />
          <a
            href="https://beian.mps.gov.cn/#/query/webSearch?code=35010402351599"
            rel="noreferrer"
            target="_blank"
            class="handle-default-a"
            style="vertical-align: middle"
            >闽公网安备35010402351599</a
          >
        </div>
      </div>
      <div class="mps-footer-row">
        <div class="mps-footer-inline">
          Build.Frontend Ver.{{ FE_VERSION }}
          {{ FE_UPDATE }}
        </div>
        <div class="mps-footer-inline">
          Build.Backend Ver.{{ BE_VERSION }}
          {{ BE_UPDATE }}
        </div>
      </div>
      <div class="mps-footer-row">
        Copyright © 2020-2025 MP Studio, All Rights Reserved.
      </div>
    </footer>
  </div>
  <Live2d />
</template>
<style lang="scss" scoped>
.mps-view-client {
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.6);
  .mps-comp-client-header {
    width: calc(100% - 40px);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: $bg-color-2;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
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
        -webkit-font-smoothing: antialiased;
        @media screen and (max-width: $mobile-width) {
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
  .mps-view-client-main {
    position: relative;
    padding-top: 30px;
    padding-bottom: 30px;
    min-height: calc(100vh - 110px);
  }
  .mps-comp-client-footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0 10px 0;
    background-color: $bg-color-2;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    color: $text-gary-color-2;
    .mps-footer-row {
      width: 100%;
      margin: 5px 0 0 0;
      text-align: center;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      .mps-footer-inline {
        margin: 0 10px 0 10px;
      }
    }
  }
}
</style>
