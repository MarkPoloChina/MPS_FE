<template>
  <el-sub-menu :index="tag.name" v-if="tag.children.length">
    <template #title>
      <el-link @click.stop="router.push(`/blog/tag/${tag.id}`)"
        ><span>{{ tag.name }}</span></el-link
      >
    </template>
    <tag-tree
      :tag="childTag"
      v-for="childTag in tag.children"
      :key="childTag.id"
    ></tag-tree>
  </el-sub-menu>
  <el-menu-item
    :index="tag.name"
    v-else
    @click="router.push(`/blog/tag/${tag.id}`)"
  >
    <template #title>{{ tag.name }}</template>
  </el-menu-item>
</template>

<script setup lang="ts">
import type { TagDto } from "@/ts/interface/tagDto";
import { useRouter } from "vue-router";
const router = useRouter();
defineProps<{
  tag: TagDto;
}>();
</script>
