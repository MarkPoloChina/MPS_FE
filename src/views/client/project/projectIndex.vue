<template>
  <div>
    <div class="mps-topimg">
      <div class="mps-topimg-text">
        <div class="bg"></div>
        <div class="tx">Project</div>
      </div>
    </div>
    <div class="mps-projects">
      <ProjectIcxor />
    </div>
  </div>
</template>
<script setup lang="ts">
import ProjectIcxor from "@/components/client/project/projectIcxor.vue";
</script>
<style lang="scss" scoped>
.bg {
  background-position: 50% 40%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("@/assets/img/67649510_p0.png");
}
.tx {
  color: white;
  background-color: $color-greengray-3;
}
.mps-projects {
  margin: 0 50px;
  @media screen and (max-width: $mobile-width) {
    margin: 0;
  }
}
</style>
