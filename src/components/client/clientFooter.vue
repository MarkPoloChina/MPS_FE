<template>
  <footer class="mps-comp-client-footer">
    <div class="mps-footer-row">
      <a
        href="https://beian.miit.gov.cn/"
        target="_blank"
        class="handle-default-a"
        >闽ICP备2020022020号-2</a
      >
    </div>
    <div class="mps-footer-row">
      Copyright © 2020-2023 MP Studio, All Rights Reserved.
      <el-link class="handle-el-link" @click="dialogVisible = true"
        >[README]</el-link
      >
    </div>
    <!-- <div
        style="
          width: 300px;
          margin: 0 auto;
          padding: 20px 0;
          text-align: center;
        "
      >
        <a
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=35010202001298"
          style="
            display: inline-block;
            text-decoration: none;
            height: 20px;
            line-height: 20px;
          "
          ><img :src="beianUrl" style="float: left" />
          <p
            style="
              float: left;
              height: 20px;
              line-height: 20px;
              margin: 0px 0px 0px 5px;
              color: #939393;
            "
          >
            闽公网安备 35010202001298号
          </p></a
        >
      </div> -->
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
        <div>Copyright © 2020-2023 MP Studio, All Rights Reserved.</div>
      </div>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import packageJson from "../../../package.json";
import { ref } from "vue";
const dialogVisible = ref(false);
const FE_UPDATE = import.meta.env.VITE_FE_UPDATE;
const FE_VERSION = packageJson.version;
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
