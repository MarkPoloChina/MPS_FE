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
        <RouterView :key="router.currentRoute.value.fullPath"/>
      </div>
      <div class="right-side">
        <div class="mps-tag-menu-container">
          <el-menu>
            <el-menu-item
              :index="'index'"
              @click="router.push(`/blog`)"
            >
              <template #title>首页</template>
            </el-menu-item>
            <tag-tree :tag="tag" v-for="tag in tags" :key="tag.id" />
          </el-menu>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { API } from "@/api";
import { TagDto } from "@/ts/interface/tagDto";
import { onMounted, ref } from "vue";
import tagTree from "@/components/client/blog/tagTree.vue";
import { useRouter } from "vue-router";
const tags = ref<TagDto[]>([]);
const router = useRouter();
onMounted(() => {
  getTags();
});
async function getTags() {
  const res = await API.getTags();
  tags.value = res;
}
</script>
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
  padding: 20px 50px;
  @media screen and (max-width: $mobile-width) {
    padding: 20px 0;
  }
  .center-side {
    width: 100%;
    overflow: hidden;
    @media screen and (max-width: $mobile-width) {
      width: 100%;
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
