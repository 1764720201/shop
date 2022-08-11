export interface CartInfoList {
  cartPrice: number;
  couponInfoList: null;
  createTime: string;
  id: number;
  imgUrl: string;
  isChecked: number;
  isOrdered: number;
  operateTime: string;
  orderTime: null;
  skuId: number;
  skuName: string;
  skuNum: number;
  skuPrice: number;
  sourceId: number;
  sourceType: string;
  userId: string;
}
export type ShopCart = {
  activityRuleList: string;
  cartInfoList: CartInfoList[];
  createTime: string;
};
