<template>
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
      Copyright © 2020-2024 MP Studio, All Rights Reserved.
    </div>
  </footer>
</template>
<script setup lang="ts">
import { API } from "@/api";
import packageJson from "@/../package.json";
import { onMounted, ref } from "vue";
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
<style lang="scss" scoped>
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
  .mps-footer-row {
    width: 100%;
    margin: 5px 0 0 0;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    @media screen and (max-width: $mobile-width) {
      font-size: 12px;
    }
    .mps-footer-inline {
      margin: 0 10px 0 10px;
    }
  }
}
</style>
