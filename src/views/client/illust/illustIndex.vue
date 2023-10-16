<template>
  <div>
    <div class="mps-topimg">
      <div class="mps-topimg-text">
        <div class="bg"></div>
        <div class="tx">Illust</div>
      </div>
    </div>
    <illust-today></illust-today>
  </div>
</template>
<script setup lang="ts">
import IllustToday from "@/components/client/illust/illustToday.vue";
</script>
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
