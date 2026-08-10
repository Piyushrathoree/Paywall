import { useBalanceStore } from "../atoms/balance";

export const useBalance = () => {
  return useBalanceStore((state) => state.balance);
};
