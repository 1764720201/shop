interface Category {
  categoryId: number;
  categoryName: string;
}
interface CategoryChild {
  categoryId: number;
  categoryName: string;
  categoryChild: Category[];
}
export type CategoryList = {
  categoryChild: CategoryChild[];
  categoryId: number;
  categoryName: string;
};
