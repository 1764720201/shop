<template>
  <TypeNav></TypeNav>
  <ListContainer></ListContainer>
  <TodayRecommend></TodayRecommend>
  <Rank></Rank>
  <Like></Like>
  <Floor v-for="floor in floorList" :key="floor.id" :floor="floor" />
  <Brand></Brand>
</template>
<script setup lang="ts">
import ListContainer from "./ListContainer/index.vue";
import TodayRecommend from "./TodayRecommend/index.vue";
import Rank from "./Rank/index.vue";
import Like from "./Like/index.vue";
import Floor from "./Floor/index.vue";
import Brand from "./Brand/index.vue";
import useStore from "@/stores";
import { storeToRefs } from "pinia";
const store = useStore();
onMounted(() => {
  store.home.getFloorList();
});
const { floorList } = storeToRefs(store.home);
</script>

<style lang="less"></style>
