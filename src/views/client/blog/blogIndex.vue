<script setup lang="ts">
import { API } from "@/api";
import type { TagDto } from "@/ts/interface/tagDto";
import { onMounted, ref } from "vue";
import TagTree from "@/components/client/blog/tagTree.vue";
import { useRouter } from "vue-router";
import { Link } from "@element-plus/icons-vue";
const tags = ref<TagDto[]>([]);
const router = useRouter();
onMounted(() => {
  getTags();
});
async function getTags() {
  const res = await API.getTags();
  tags.value = res;
}
const drawerVisible = ref(false);
</script>
<template>
  <div>
    <div class="mps-topimg">
      <div class="mps-topimg-text">
        <div class="bg"></div>
        <div class="tx">Blog</div>
      </div>
    </div>
    <div class="mps-blog-container">
      <div class="center-side">
        <div class="mps-hide-tag-menu-container">
          <el-button type="primary" @click="drawerVisible = true">
            <el-icon><Link /> </el-icon>
          </el-button>
        </div>
        <RouterView :key="router.currentRoute.value.fullPath" />
      </div>
      <div class="right-side">
        <div class="mps-tag-menu-container">
          <el-menu>
            <el-menu-item :index="'index'" @click="router.push(`/blog`)">
              <template #title>首页</template>
            </el-menu-item>
            <tag-tree :tag="tag" v-for="tag in tags" :key="tag.id" />
          </el-menu>
        </div>
      </div>
    </div>
    <el-drawer
      v-model="drawerVisible"
      direction="rtl"
      size="100%"
      title=""
      append-to-body
      class="mps-drawer-tag-menu"
    >
      <div class="mps-drawer-tag-menu-container">
        <el-menu>
          <el-menu-item
            :index="'index'"
            @click="
              router.push(`/blog`);
              drawerVisible = false;
            "
          >
            <template #title>首页</template>
          </el-menu-item>
          <tag-tree
            :tag="tag"
            v-for="tag in tags"
            :key="tag.id"
            @menu-click="drawerVisible = false"
          />
        </el-menu>
      </div>
    </el-drawer>
  </div>
</template>
<style lang="scss" scoped>
.bg {
  background-position: 50% 40%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("@/assets/img/53061497_p0.jpg");
}
.tx {
  color: white;
  background-color: $color-stdblue-1;
}
.mps-blog-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 250px;
  @media screen and (max-width: $large-desktop-width) {
    padding: 20px 100px;
  }
  @media screen and (max-width: $desktop-width) {
    padding: 20px 50px;
  }
  @media screen and (max-width: $pad-width) {
    padding: 20px 20px;
  }
  @media screen and (max-width: $mobile-width) {
    padding: 20px 10px;
  }
  .center-side {
    width: 100%;
    overflow: hidden;
    @media screen and (max-width: $mobile-width) {
      width: 100%;
    }
    .mps-hide-tag-menu-container {
      display: none;
      @media screen and (max-width: $mobile-width) {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
      }
    }
  }
  .right-side {
    width: 20%;
    max-width: 300px;
    flex: none;
    @media screen and (max-width: $mobile-width) {
      display: none;
    }
    .mps-tag-menu-container {
      margin-left: 10px;
      border-radius: 10px;
      background-color: white;
      padding: 10px 0;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .el-menu {
      background-color: transparent;
      border: none;
    }
  }
}
</style>
<style lang="scss">
.mps-drawer-tag-menu {
  --el-drawer-bg-color: rgba(255, 255, 255, 0.8);
  .mps-drawer-tag-menu-container {
    ul {
      border-radius: 10px;
    }
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
