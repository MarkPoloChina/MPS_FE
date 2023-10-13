<template>
  <div class="mps-view-client-illust">
    <div class="mps-topimg">
      <div class="mps-topimg-text mps-illust-topimg">Illust</div>
    </div>
    <illust-today></illust-today>
  </div>
</template>
<script setup lang="ts">
import IllustToday from "@/components/client/illust/illustToday.vue";
</script>
<style lang="scss" scoped>
.mps-view-client-illust {
  width: 100%;
  padding: 0 0 20px 0;

  .mps-illust-topimg {
    background-position: 50% 55%;
    background-repeat: no-repeat;
    background-size: cover;
    color: $text-gary-color-1;
    text-align: right;
    background-image: url("@/assets/img/81137334_p0.jpg");
  }
}
</style>
