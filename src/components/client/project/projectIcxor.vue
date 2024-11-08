<script setup lang="ts">
import appImg from "@/assets/img/icxor/app.png";
import appIcon from "@/assets/img/icxor/icon.png";
</script>
<template>
  <div class="mps-project-icxor">
    <div class="info">
      <div class="basic">
        <div class="icon">
          <img :src="appIcon" />
        </div>
        <div>
          <div class="title">ICXOR</div>
          <div>
            <span class="iconfont" style="margin-right: 5px">&#xec01;</span>
            <a
              href="https://github.com/MarkPoloChina/ICXOR"
              class="handle-default-a"
              target="_blank"
              >ICXOR in Github</a
            >
          </div>
        </div>
      </div>
      <div class="desc">
        ICXOR (Illust Complexor) is a native tool built by electron to manage
        illusts at Pixiv or any picture bed.
      </div>
    </div>
    <div class="app-img">
      <img :src="appImg" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mps-project-icxor {
  background-color: rgba(46, 136, 192, 0.9);
  border-radius: 20px;
  color: white;
  padding: 40px;
  display: flex;
  flex-direction: row;
  width: calc(100% - 80px);
  align-items: center;
  gap: 20px;
  overflow: hidden;
  @media screen and (max-width: $mobile-width) {
    padding: 20px;
    width: calc(100% - 40px);
    flex-direction: column;
  }
  .app-img {
    max-width: 40%;
    min-width: 200px;
    flex-basis: 40%;
    img {
      width: 100%;
      border-radius: 5px;
    }
    @media screen and (max-width: $mobile-width) {
      max-width: 100%;
      flex-basis: 100%;
    }
  }
  .info {
    max-width: 60%;
    flex-basis: 60%;
    @media screen and (max-width: $mobile-width) {
      max-width: 100%;
      flex-basis: 100%;
    }
    .basic {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 20px;
      gap: 20px;
      @media screen and (max-width: $mobile-width) {
        gap: 5px;
      }
      .icon {
        background-color: white;
        padding: 15px;
        border-radius: 20px;
        width: 10%;
        flex-basis: 10%;
        min-width: 50px;
        @media screen and (max-width: $mobile-width) {
          padding: 10px;
          border-radius: 10px;
          margin: 10px;
        }
        img {
          width: 100%;
        }
      }
      .title {
        font-size: 4rem;
        font-weight: bold;
      }
    }
    .desc {
      font-size: 1.3rem;
    }
  }
}
</style>
