type Carouse1List = {
  id: string;
  imgUrl: string;
};
type NavList = {
  text: string;
  url: string;
};
export type FloorList = {
  bigImg: string;
  carouse1List: Carouse1List[];
  id: string;
  imgUrl: string;
  keywords: string[];
  name: string;
  navList: NavList[];
  recommendList: string[];
};
