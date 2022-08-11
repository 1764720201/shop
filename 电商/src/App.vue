<template>
  <Header></Header>
  <router-view></router-view>
  <Footer v-show="route.meta.isShow"></Footer>
</template>
<script setup lang="ts">
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";
import { useRoute } from "vue-router";
import useStore from "./stores";

const store = useStore();
onMounted(() => {
  store.home.getCategoryList();
  useStore().user.getUserInfo();
});

const route = useRoute();
</script>

<style lang="less" scoped></style>
