<template>
  <div class="pagination">
    <div class="example-pagination-block" v-if="total">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @prev-click="getPage"
        @next-click="getPage"
        @current-change="getPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts" name="Pagination">
import type { ComputedRef } from "vue";

type PageDetail = {
  pageNo: number;
  pageSize: number;
  total: number;
  continues: number;
};

const props = defineProps<PageDetail>();

const { pageNo, pageSize, continues, total } = reactive(props);

const totalpage: ComputedRef<number> = computed<number>(() => {
  return Math.ceil(total / pageSize);
});

const emit = defineEmits(["get-page"]);
const getPage = (pageNo: number) => {
  emit("get-page", pageNo);
};
let pages: number[] = [];

const startNumEndNum = computed(() => {
  let start: number = 0;
  let end: number = 0;
  if (continues > totalpage.value) {
    start = 1;
    end = totalpage.value;
  } else {
    start = pageNo - Math.floor(continues / 2);
    end = pageNo + Math.floor(continues / 2);
    if (start < 1) {
      start = 1;
      end = continues;
    }
    if (end > totalpage.value) {
      start = totalpage.value - continues + 1;
      end = totalpage.value;
    }
  }
  return { start, end };
});
for (
  let page = startNumEndNum.value.start;
  page < startNumEndNum.value.end + 1;
  page++
) {
  pages.push(page);
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  .example-pagination-block {
    display: flex;
    justify-content: center;
  }
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
