<template>
  <div class="mps-view-client-bg">
    <div class="mps-view-client">
      <client-header></client-header>
      <div class="mps-view-client-main">
        <router-view />
      </div>
      <client-footer></client-footer>
    </div>
  </div>
  <Live2d />
</template>
<script setup lang="ts">
import ClientHeader from "@/components/client/clientHeader.vue";
import ClientFooter from "@/components/client/clientFooter.vue";
import Live2d from "@/components/client/live2dModule.vue";
</script>
<style lang="scss" scoped>
.mps-view-client-bg {
  .mps-view-client {
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.6);
    .mps-view-client-main {
      position: relative;
      padding-top: 30px;
      padding-bottom: 30px;
      min-height: calc(100vh - 110px);
    }
  }
}
</style>
<style>
body {
  background-image: url("@/assets/img/90773916_p1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover !important;
  -moz-background-size: cover !important;
  -o-background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  z-index: -1;
}
body:before {
  content: "";
  position: fixed;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: inherit;
  -webkit-background-size: cover !important;
  -o-background-size: cover;
  background-size: cover !important;
  background-position: center center;
}
</style>
