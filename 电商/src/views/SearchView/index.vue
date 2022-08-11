<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParmas.categoryName">
              {{ searchParmas.categoryName }}
              <i @click="removeCategoryName">x</i>
            </li>
            <li class="with-x" v-if="searchParmas.keyword">
              {{ searchParmas.keyword }}
              <i @click="removekeyword">x</i>
            </li>
            <li class="with-x" v-if="searchParmas.trademark">
              {{ searchParmas.trademark.split(":")[1] }}
              <i @click="removeTrademark">x</i>
            </li>
            <li
              class="with-x"
              v-for="(prop, index) in searchParmas.props"
              :key="index"
            >
              {{ prop.split(":")[1] }}
              <i @click="removeProp(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademark-info="trademarkInfo" @attr-info="attrInfo" />
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isSynthesize }" @click="changeOrder('1')">
                  <a
                    >综合<el-icon v-show="isSynthesize && isAsc"
                      ><ArrowUpBold
                    /></el-icon>
                    <el-icon v-show="isSynthesize && isDesc">
                      <ArrowDownBold />
                    </el-icon>
                  </a>
                </li>
                <li :class="{ active: isPrice }" @click="changeOrder('2')">
                  <a
                    >价格<el-icon v-show="isPrice && isAsc"
                      ><ArrowUpBold
                    /></el-icon>
                    <el-icon v-show="isPrice && isDesc">
                      <ArrowDownBold /> </el-icon
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`"
                      ><img v-lazy="good.defaultImg"
                    /></router-link>
                    >
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div v-if="total">
            <Pagination
              :pageNo="searchParmas.pageNo"
              :pageSize="searchParmas.pageSize"
              :total="total"
              :continues="5"
              @get-page="getPage"
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Search">
import useStore from "@/stores";
import { storeToRefs } from "pinia";
import SearchSelector from "./SearchSelector/SearchSelector.vue";
import type { AttrsList, SearchParmas, TrademarkInfo } from "@/types/search";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();
const instance = getCurrentInstance();
let searchParmas = reactive<SearchParmas>({
  category3Id: "",
  category2Id: "",
  category1Id: "",
  categoryId: "",
  categoryName: "",
  keyword: "",
  order: "1:desc",
  pageNo: 1,
  pageSize: 3,
  props: [],
  trademark: "",
});

onBeforeMount(() => {
  Object.assign(searchParmas, route.query, route.params);
});
onMounted(() => {
  getStore();
});
watch(route, () => {
  Object.assign(searchParmas, route.query, route.params);
  getStore();
});
const getPage = (pageNo: number) => {
  searchParmas.pageNo = pageNo;
  getStore();
};

const trademarkInfo = (trademark: TrademarkInfo) => {
  searchParmas.trademark = `${trademark.tmId}:${trademark.tmName}`;
  getStore();
};
const attrInfo = (attr: AttrsList, attrValue: string) => {
  const props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
  if (searchParmas.props.indexOf(props) == -1) searchParmas.props.push(props);
  getStore();
};

const removeCategoryName = () => {
  searchParmas.categoryName = undefined;
  searchParmas.categoryId = undefined;
  router.push({
    name: "search",
    params: route.params,
  });
};
const removekeyword = () => {
  searchParmas.keyword = undefined;
  instance?.proxy?.$Bus.emit("clear");
  router.push({
    name: "search",
    query: route.query,
  });
};
const removeTrademark = () => {
  searchParmas.trademark = undefined;
  getStore();
};
const removeProp = (index: number) => {
  searchParmas.props.splice(index, 1);
  getStore();
};
const changeOrder = (flag: string) => {
  let originOrder = searchParmas.order;
  let originFlag = originOrder.split(":")[0];
  let originSort = originOrder.split(":")[1];
  let newOrder = "";
  if (flag == originFlag) {
    newOrder = `${originFlag}:${originSort == "asc" ? "desc" : "asc"}`;
  } else {
    newOrder = `${flag}:'desc'`;
  }
  searchParmas.order = newOrder;
  getStore();
};

const isSynthesize = computed<boolean>(() => {
  return searchParmas.order.indexOf("1") !== -1;
});
const isPrice = computed<boolean>(() => {
  return searchParmas.order.indexOf("2") !== -1;
});
const isAsc = computed<boolean>(() => {
  return searchParmas.order.indexOf("asc") !== -1;
});
const isDesc = computed<boolean>(() => {
  return searchParmas.order.indexOf("desc") !== -1;
});

const getStore = () => store.search.getSearchList(searchParmas);
const { goodsList, total } = storeToRefs(store.search);
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
