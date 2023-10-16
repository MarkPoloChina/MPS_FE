<template>
  <div>
    <index-carousel></index-carousel>
    <index-intro></index-intro>
  </div>
</template>
<script setup lang="ts">
import IndexCarousel from "@/components/client/home/homeCarousel.vue";
import IndexIntro from "@/components/client/home/homeIntro.vue";
import { onMounted } from "vue";
onMounted(() => {});
</script>
<style lang="scss" scoped></style>
