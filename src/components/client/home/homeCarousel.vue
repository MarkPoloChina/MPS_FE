<template>
  <div class="mps-comp-index-carousel">
    <el-carousel indicator-position="outside" :interval="5000">
      <el-carousel-item
        v-for="item in [cover1, cover2, cover3, cover4]"
        :key="item"
        class="mps-comp-index-carousel-main"
      >
        <el-image :src="item" fit="cover" class="mps-cover-img"></el-image>
      </el-carousel-item>
    </el-carousel>
    <div class="mps-title-container">
      <div class="mps-title">
        <div class="mps-title-blur">
          <div class="mps-title-mp mps-title-text">(*￣︶￣)</div>
          <div class="mps-title-design mps-title-text">Powered by MPSTO</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import cover1 from "@/assets/img/83760346_p0.jpg";
import cover2 from "@/assets/img/86616238_p0.jpg";
import cover3 from "@/assets/img/82336808_p0_d.jpg";
import cover4 from "@/assets/img/90014887_p0.jpg";
onMounted(() => {});
</script>
<style lang="scss" scoped>
.mps-comp-index-carousel {
  position: relative;
  :deep(.el-carousel__container) {
    height: 750px;
    @media screen and (max-width: $mobile-width) {
      height: 350px;
    }
  }

  .mps-comp-index-carousel-main {
    border-radius: 20px;

    .mps-cover-img {
      width: 100%;
      height: 100%;
    }
  }

  .mps-title-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    .mps-title {
      display: flex;
      height: 100%;
      width: 100%;
      flex-direction: column;
      justify-content: end;
      align-items: center;

      .mps-title-blur {
        background-color: rgba(0, 0, 0, 0.35);
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(3px);
        padding: 20px 20px 20px 20px;
        border-radius: 20px;
        margin-bottom: 30px;
      }

      .mps-title-text {
        text-align: center;
        color: white;
        font-family: "Raleway";

        &.mps-title-mp {
          margin: 20px 0 20px 0;
          font-size: 100px;
          font-weight: 600;
        }

        &.mps-title-design {
          font-size: 40px;
          font-weight: 300;
        }

        @media screen and (max-width: $mobile-width) {
          &.mps-title-mp {
            font-size: 50px;
          }

          &.mps-title-design {
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>
