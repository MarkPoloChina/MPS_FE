<template>
  <div class="mps-404">
    <div class="mps-404-text">MPS :(</div>
    <div class="mps-404-text">[404] Page Not Found</div>
    <div>
      <el-link @click="router.back()" class="handle-el-link">
        CLICK ME BACK
      </el-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
<style lang="scss" scoped>
.mps-404 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 50px;
  font-weight: bold;
  color: white;
  background-color: $color-stdblue-1;
  flex-direction: column;
  .mps-404-text {
    text-align: center;
  }
  .handle-el-link {
    font-size: 30px;
  }
}
</style>
