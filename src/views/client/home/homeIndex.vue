<script setup lang="ts">
import { onMounted } from "vue";
import {
  Promotion,
  House,
  Document,
  Picture as PictureIcon,
  Files,
  User,
  MapLocation,
  ChatDotRound,
} from "@element-plus/icons-vue";
import cover1 from "@/assets/img/1668579404073820163@amsrntk3_photo.jpg";
import cover2 from "@/assets/img/86616238_p0.jpg";
import cover3 from "@/assets/img/82336808_p0_d.jpg";
import avatar from "@/assets/img/avatar.jpg";
import { useRouter } from "vue-router";
const router = useRouter();
onMounted(() => {});
</script>
<template>
  <div class="mps-comp-index-carousel">
    <el-carousel indicator-position="outside" :interval="5000">
      <el-carousel-item
        v-for="item in [cover1, cover2, cover3]"
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
  <div class="mps-comp-index-intro">
    <div class="mps-intro-row mps-intro-guide">
      <div class="mps-intro-side">
        <el-icon :size="100" color="white">
          <promotion></promotion>
        </el-icon>
        <span>Guide</span>
      </div>
      <div class="mps-intro-main">
        <div class="mps-intro-main-row">
          <el-icon :size="30" color="white" class="mps-intro-icon">
            <house></house>
          </el-icon>
          <div class="mps-intro-group">
            <div>
              <el-link class="handle-el-link" @click="router.push('/')"
                >Index</el-link
              >, what you see now.
            </div>
          </div>
        </div>
        <div class="mps-intro-main-row">
          <el-icon :size="30" color="white" class="mps-intro-icon">
            <Document></Document>
          </el-icon>
          <div class="mps-intro-group">
            <div>
              <el-link class="handle-el-link" @click="router.push('/blog')"
                >Blog</el-link
              >, sharing some technologic articles and daily stickies.
            </div>
          </div>
        </div>
        <div class="mps-intro-main-row">
          <el-icon :size="30" color="white" class="mps-intro-icon">
            <picture-icon></picture-icon>
          </el-icon>
          <div class="mps-intro-group">
            <div>
              <el-link class="handle-el-link" @click="router.push('/illust')"
                >Illust</el-link
              >, sharing some pics.
            </div>
          </div>
        </div>
        <div class="mps-intro-main-row">
          <el-icon :size="30" color="white" class="mps-intro-icon">
            <files></files>
          </el-icon>
          <div class="mps-intro-group">
            <div>
              <el-link class="handle-el-link" @click="router.push('/project')"
                >Projects</el-link
              >, showing some web works.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mps-intro-row mps-intro-me">
      <div class="mps-intro-side">
        <el-avatar :size="100" :src="avatar" />
        <span>Me</span>
      </div>
      <div class="mps-intro-main">
        <div class="mps-intro-main-row">
          <el-icon :size="30" color="white" class="mps-intro-icon">
            <user></user>
          </el-icon>
          <div class="mps-intro-group">
            <div>Mark Polo</div>
          </div>
        </div>
        <div class="mps-intro-main-row">
          <el-icon :size="30" color="white" class="mps-intro-icon">
            <map-location></map-location>
          </el-icon>
          <div class="mps-intro-group">
            <div>SI of XMU, Xiamen, China P.R.</div>
          </div>
        </div>
        <div class="mps-intro-main-row">
          <el-icon :size="30" color="white" class="mps-intro-icon">
            <chat-dot-round></chat-dot-round>
          </el-icon>
          <div class="mps-intro-group">
            <div class="mps-intro-contact">
              <span class="iconfont">&#xe602;</span>
              <div>26239122xzw@gmail.com</div>
            </div>
            <div class="mps-intro-contact">
              <span class="iconfont">&#xe622;</span>
              <a
                href="https://twitter.com/MarkXiong16"
                class="handle-default-a"
                target="_blank"
                >@MarkXiong16</a
              >
            </div>
            <div class="mps-intro-contact">
              <span class="iconfont">&#xec01;</span>
              <a
                href="https://github.com/MarkPoloChina"
                class="handle-default-a"
                target="_blank"
                >MarkPoloChina</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
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
        pointer-events: initial;
      }

      .mps-title-text {
        text-align: center;
        color: white;
        font-family: "Raleway";

        &.mps-title-mp {
          margin: 20px 0 20px 0;
          font-size: 5.5rem;
          font-weight: 600;
        }

        &.mps-title-design {
          font-size: 2.5rem;
          font-weight: 300;
        }
      }
    }
  }
}
.mps-comp-index-intro {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: white;
  .mps-intro-row {
    width: 100%;
    display: flex;
    position: relative;
    flex-direction: row;
    margin: 0 0 30px 0;
    border-radius: 20px;
    &.mps-intro-guide {
      background-color: $theme-main-color-2t;
    }
    &.mps-intro-me {
      background-color: $theme-main-color-3t;
    }
    .mps-intro-side {
      width: 30%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: none;
      span {
        margin-top: 10px;
        font-family: "Raleway";
        font-weight: 400;
        font-size: 2.5rem;
      }
    }
    .mps-intro-main {
      .mps-intro-main-row {
        padding: 10px 5px 10px 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        font-size: 1.5rem;
        font-family: "Raleway";
        font-weight: 200;
        .mps-intro-icon {
          flex: none;
          margin-right: 30px;
        }
        .mps-intro-group {
          flex: auto;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: flex-start;
          flex-wrap: wrap;
          word-break: break-word;
          > div {
            margin: 10px 20px 10px 0;
          }
        }
        .mps-intro-contact {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          span {
            margin: 0 10px 0 0;
            font-size: 1.8rem;
          }
        }
      }
    }
  }
}
</style>
