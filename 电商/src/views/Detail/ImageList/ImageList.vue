<template>
  <swiper :slidesPerView="3" :spaceBetween="30">
    <swiper-slide
      v-for="(slide, index) in skuImageList"
      :key="slide.skuId"
      class="swiper-slide"
    >
      <img
        :src="slide.imgUrl"
        :class="{ active: currentIndex == index }"
        @click="changeCurrentIndex(index)"
    /></swiper-slide>
  </swiper>
</template>

<script setup lang="ts" name="ImageList">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
const instance = getCurrentInstance();
const currentIndex = ref(0);
const changeCurrentIndex = (index: number) => {
  currentIndex.value = index;
  instance?.proxy?.$Bus.emit("getIndex", currentIndex.value);
};

interface SkuImageList {
  id: number;
  imgName: string;
  imgUrl: string;
  isDefault: string;
  skuId: number;
  spuImgId: number;
}
const props = defineProps<{ skuImageList: SkuImageList[] }>();
const { skuImageList } = props;
</script>

<style lang="less" scoped>
.swiper {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;
  .swiper-slide {
    width: 56px;
    height: 56px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;
    }
    .active {
      border: 2px solid #f60;
      padding: 1px;
    }

    :hover {
      border: 2px solid #f60;
      padding: 1px;
    }
  }
}
</style>
