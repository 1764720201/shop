export type AddressInfo = {
  consignee: string;
  fullAddress: string;
  id: number;
  isDefault: string;
  phoneNum: string;
  provinceId: number;
  regionId: number;
  userAddress: string;
  userId: number;
};
interface DetailArrayList {
  id: null;
  imgUrl: string;
  orderId: null;
  orderPrice: number;
  refundStatus: string;
  refundStatusString: string;
  skuId: number;
  skuName: string;
  skuNum: number;
  sourceId: number;
  sourceType: string;
}

interface OrderDetailVoList {
  activityRule: null;
  orderDetailList: DetailArrayList[];
}
interface UserAddressList {
  consignee: string;
  fullAddress: string;
  id: number;
  isDefault: string;
  phoneNum: string;
  provinceId: number;
  regionId: number;
  userAddress: string;
  userId: number;
}
export type OrderInfo = {
  activityReduceAmount: number;
  couponInfoList: [];
  detailArrayList: DetailArrayList[];
  orderDetailVoList: OrderDetailVoList[];
  originalTotalAmount: number;
  totalAmount: number;
  totalNum: number;
  tradeNo: string;
  userAddressList: UserAddressList[];
};
export type Submit = {
  consignee: string;
  consigneeTel: string;
  deliveryAddress: string;
  paymentWay: string;
  orderComment: string;
  orderDetailList: DetailArrayList[];
};
export type PayInfo = {
  codeUrl: string;
  orderId: number;
  resultCode: string;
  totalFee: number;
};
interface OrderDetailList {
  activityRule: null;
  couponInfoList: null;
  createTime: string;
  hasStock: null;
  id: number;
  imgUrl: string;
  orderId: number;
  orderPrice: number;
  refundStatus: string;
  refundStatusString: string;
  skuId: number;
  skuName: string;
  skuNum: number;
  sourceId: number;
  sourceType: string;
  splitActivityAmount: number;
  splitCouponAmount: number;
  splitTotalAmount: number;
}
interface Record {
  activityReduceAmount: null;
  consignee: null;
  consigneeTel: null;
  couponAmount: null;
  couponInfo: null;
  createTime: string;
  deliveryAddress: null;
  expireTime: string;
  feightFee: null;
  feightFeeReduce: null;
  id: number;
  imgUrl: null;
  operateTime: null;
  orderComment: "";
  orderDetailList: OrderDetailList[];
  orderDetailVoList: null;
  orderStatus: string;
  orderStatusName: string;
  originalTotalAmount: null;
  outTradeNo: string;
  parentOrderId: null;
  paymentWay: string;
  processStatus: string;
  provinceId: null;
  refundableTime: null;
  totalAmount: number;
  trackingNo: null;
  tradeBody: string;
  userId: number;
  wareId: null;
}
export type OrderList = {
  current: number;
  pages: number;
  records: Record[];
  searchCount: boolean;
  size: number;
  total: number;
};
