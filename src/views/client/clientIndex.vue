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
</template>
<script setup lang="ts">
import ClientHeader from "@/components/client/clientHeader.vue";
import ClientFooter from "@/components/client/clientFooter.vue";
</script>
<style lang="scss" scoped>
.mps-view-client-bg {
  width: 100%;
  background-size: auto 100%;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  background-image: url("@/assets/img/90773916_p1.jpg");
  .mps-view-client {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.5);
    .mps-view-client-main {
      position: relative;
      padding-top: 70px;
      padding-bottom: 30px;
      min-height: calc(100vh - 100px);
    }
  }
}
</style>
