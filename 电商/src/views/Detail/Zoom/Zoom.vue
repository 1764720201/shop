<template>
  <div class="spec-preview">
    <img :src="skuImageList[currentIndex].imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big" ref="big">
      <img :src="skuImageList[currentIndex].imgUrl" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script setup lang="ts" name="Zoom">
import type { Ref } from "vue";

interface skuImageList {
  id: number;
  imgName: string;
  imgUrl: string;
  isDefault: string;
  skuId: number;
  spuImgId: number;
}
const mask: Ref<HTMLDivElement> = ref<HTMLDivElement>(
  null as unknown as HTMLDivElement
);
const big: Ref<HTMLDivElement> = ref<HTMLDivElement>(
  null as unknown as HTMLDivElement
);
const currentIndex = ref<number>(0);
const instance = getCurrentInstance();
onMounted(() => {
  instance?.proxy?.$Bus.on("getIndex", (index) => {
    currentIndex.value = index as number;
  });
});
const handler = (event: MouseEvent) => {
  let left = event.offsetX - mask.value.offsetWidth / 2;
  let top = event.offsetY - mask.value.offsetHeight / 2;
  if (left <= 0) left = 0;
  if (left >= mask.value.offsetWidth) left = mask.value.offsetWidth;
  if (top <= 0) top = 0;
  if (top >= mask.value.offsetHeight) top = mask.value.offsetHeight;
  mask.value.style.left = left + "px";
  mask.value.style.top = top + "px";
  big.value.style.left = 2 * left + "px";
  big.value.style.top = 2 * top + "px";
};
const props = defineProps<{ skuImageList: skuImageList[] }>();
const { skuImageList } = props;
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
