<template>
  <el-carousel :height="height" v-if="list[0]">
    <el-carousel-item v-for="carouse in list" :key="carouse.id">
      <img :src="carouse.imgUrl" />
    </el-carousel-item>
  </el-carousel>
</template>
<script setup lang="ts">
defineProps<{ list: any; height: string }>();
</script>

<style lang="less" scoped></style>
