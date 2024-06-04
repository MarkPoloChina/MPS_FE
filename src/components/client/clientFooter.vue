<template>
  <footer class="mps-comp-client-footer">
    <div class="mps-footer-row beian-row">
      <div class="beian-inline">
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          class="handle-default-a"
          >闽ICP备2020022020号-2</a
        >
      </div>
      <div class="beian-inline">
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
      Copyright © 2020-2024 MP Studio, All Rights Reserved.
      <el-link class="handle-el-link" @click="dialogVisible = true"
        >[README]</el-link
      >
    </div>
  </footer>
  <el-dialog v-model="dialogVisible" title="About" width="80%" append-to-body>
    <div class="mps-about">
      <div class="mps-about-head">
        <img src="@/assets/img/logo.svg" />
        <div>Mark Polo Space Powered by MPSTO.</div>
      </div>
      <div class="mps-about-lib">
        <div>
          <img src="@/assets/img/vue-logo.svg" />
          <div>Vue - The MIT License</div>
        </div>
        <div>
          <img src="@/assets/img/element-plus-logo.svg" />Element Plus - The MIT
          License
        </div>
      </div>
      <div class="mps-about-version">
        <div>
          Build.Frontend Ver.{{ FE_VERSION }}
          {{ FE_UPDATE }}
        </div>
        <div>
          Build.Backend Ver.{{ BE_VERSION }}
          {{ BE_UPDATE }}
        </div>
        <div>Copyright © 2020-2024 MP Studio, All Rights Reserved.</div>
      </div>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { API } from "@/api";
import packageJson from "../../../package.json";
import { onMounted, ref } from "vue";
const dialogVisible = ref(false);
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
  border-radius: 20px 20px 0 0;
  padding: 10px 0 10px 0;
  background-color: $bg-color-2;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  .mps-footer-row {
    width: 100%;
    text-align: center;
    margin: 10px 0 0 0;
    &.beian-row {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
    .beian-inline {
      margin: 0 10px 0 10px;
    }
  }
}
.mps-about {
  text-align: center;
  .mps-about-head {
    padding: 20px 0 20px 0;
    font-size: 30px;
    font-weight: bold;
    img {
      height: 50px;
    }
  }
  .mps-about-lib {
    padding: 20px 0 20px 0;
    > div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      img {
        height: 25px;
        margin-right: 5px;
      }
    }
  }
  .mps-about-version {
    padding: 20px 0 20px 0;
  }
}
</style>
