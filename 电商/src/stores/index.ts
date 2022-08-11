import { useSearchStore } from "./search";
import { useHomeStore } from "./home";
import { useDetailStore } from "./detail";
import { useShopCartStore } from "./shopCart";
import { useUserStore } from "./user";
import { useTradeStore } from "./trade";
export default function useStore() {
  return {
    search: useSearchStore(),
    home: useHomeStore(),
    detail: useDetailStore(),
    shopCart: useShopCartStore(),
    user: useUserStore(),
    trade: useTradeStore(),
  };
}
