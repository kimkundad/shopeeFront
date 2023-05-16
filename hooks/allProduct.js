import useSWR from "swr";
import { fetcher } from "@/services/test";

export function getAllProduct(shopId) {
  const { data, error } = useSWR(
    `https://api.sellpang.com/api/allProduct/${shopId}`,
    fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function getShop(shop_url) {
  const { data, error } = useSWR(
    `https://api.sellpang.com/api/shop/${shop_url}`,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function getCategory(shopId) {
  const { data, error } = useSWR(
    `https://api.sellpang.com/api/getCategory/${shopId}`,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
