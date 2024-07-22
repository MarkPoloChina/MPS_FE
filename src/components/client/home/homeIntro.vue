<template>
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
              <el-link class="handle-el-link" @click="$router.push('/')"
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
              <el-link class="handle-el-link" @click="$router.push('/blog')"
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
              <el-link class="handle-el-link" @click="$router.push('/illust')"
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
              <el-link class="handle-el-link" @click="$router.push('/project')"
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
            <div>SI of XMU, Xiamen, China P.R. .</div>
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
<script setup lang="ts">
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
import avatar from "@/assets/img/avatar.jpg";
</script>
<style lang="scss" scoped>
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
        font-size: 30px;
        @media screen and (max-width: $mobile-width) {
          font-size: 25px;
        }
      }
    }
    .mps-intro-main {
      .mps-intro-main-row {
        padding: 10px 5px 10px 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        font-size: 20px;
        font-family: "Raleway";
        font-weight: 200;
        @media screen and (max-width: $mobile-width) {
          font-size: 18px;
        }
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
            font-size: 22px;
            @media screen and (max-width: $mobile-width) {
              font-size: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
