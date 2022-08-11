export type AttrsList = {
  attrId: number;
  attrName: string;
  attrValueList: string[];
};

export interface GoodsList {
  attrs: null;
  category1Id?: string;
  category1Name?: string;
  category2Id?: string;
  category2Name?: string;
  category3Id?: string;
  category3Name?: string;
  createTime?: string;
  defaultImg: string;
  hotScore: number;
  id: number;
  price: number;
  title: string;
  tmId?: number;
  tmName?: string;
}
export interface TrademarkList {
  tmId: number;
  tmName: string;
}
export type SearchInfo = {
  attrsList: AttrsList[];
  goodsList: GoodsList[];
  pageNo: number;
  pageSize: number;
  total: number;
  totalPages: number;
  trademarkList: TrademarkList[];
};
export type SearchParmas = {
  category3Id: string;
  category2Id: string;
  category1Id: string;
  categoryId?: string;
  categoryName?: string;
  keyword?: string;
  order: string;
  pageNo: number;
  pageSize: number;
  props: string[];
  trademark?: string;
};
export type TrademarkInfo = {
  tmId: number;
  tmName: string;
};
