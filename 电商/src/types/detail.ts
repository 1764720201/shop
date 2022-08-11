export interface CategoryView {
  category1Id: number;
  category1Name: string;
  category2Id: number;
  category2Name: string;
  category3Id: number;
  category3Name: string;
  id: number;
}
export interface SkuAttrValueList {
  id: number;
  attrId: number;
  valueId: number;
  skuId: number;
  attrName: string;
  valueName: string;
}
export interface SkuImageList {
  id: number;
  imgName: string;
  imgUrl: string;
  isDefault: string;
  skuId: number;
  spuImgId: number;
}
interface SkuSaleAttrValueList {
  id: number;
  saleAttrId: number;
  saleAttrName: string;
  saleAttrValueId: number;
  saleAttrValueName: string;
  skuId: number;
  spuId: number;
}
export interface SpuSaleAttrValueList {
  baseSaleAttrId: number;
  id: number;
  isChecked: string;
  saleAttrName: string;
  saleAttrValueName: string;
  spuId: number;
}
export interface SpuSaleAttrList {
  baseSaleAttrId: number;
  id: number;
  saleAttrName: string;
  spuId: number;
  spuSaleAttrValueList: SpuSaleAttrValueList[];
}
export interface SkuInfo {
  category3Id: number;
  createTime: string;
  id: number;
  isSlae: number;
  price: number;
  skuAttrValueList: SkuAttrValueList[];
  skuDefaultImg: string;
  skuDesc: string;
  skuImageList: SkuImageList[];
  skuName: string;
  skuSaleAttrValueList: SkuSaleAttrValueList[];
  spuId: number;
  tmId: number;
  weight: string;
}
export type Detail = {
  categoryView: CategoryView;
  price: number;
  skuInfo: SkuInfo;
  spuSaleAttrList: SpuSaleAttrList[];
  valuesSkuJson: string;
};
