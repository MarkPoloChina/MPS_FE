<script setup lang="ts">
import type { TagDto } from "@/ts/interface/tagDto";
import { useRouter } from "vue-router";

defineProps<{
  tag: TagDto;
}>();
defineEmits(["menuClick"]);
const router = useRouter();
</script>
<template>
  <el-sub-menu :index="tag.name" v-if="tag.children.length">
    <template #title>
      <el-link
        @click.stop="
          router.push(`/blog/tag/${tag.id}`);
          $emit('menuClick');
        "
        ><span>{{ tag.name }}</span></el-link
      >
    </template>
    <tag-tree
      :tag="childTag"
      v-for="childTag in tag.children"
      :key="childTag.id"
      @menuClick="$emit('menuClick')"
    ></tag-tree>
  </el-sub-menu>
  <el-menu-item
    :index="tag.name"
    v-else
    @click="
      router.push(`/blog/tag/${tag.id}`);
      $emit('menuClick');
    "
  >
    <template #title>{{ tag.name }}</template>
  </el-menu-item>
</template>
