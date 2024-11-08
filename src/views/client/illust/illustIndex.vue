<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
<template>
  <div>
    <div class="mps-topimg">
      <div class="mps-topimg-text">
        <div class="bg"></div>
        <div class="tx">Illust</div>
      </div>
    </div>
    <RouterView :key="router.currentRoute.value.fullPath" />
  </div>
</template>
<style lang="scss" scoped>
.bg {
  background-position: 50% 55%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("@/assets/img/81137334_p0.jpg");
}
.tx {
  background-color: white;
  color: $text-gary-color-1;
}
</style>
