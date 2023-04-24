import useSWR from "swr"
import { fetcher } from "@/services/test"

export function getAllProduct(shop_url) {
    
    const { data, error } = useSWR(`https://shopee-api.deksilp.com/api/allProduct/${shop_url}`, fetcher)
    
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}

export function getShop(shopId) {
    
    const { data, error } = useSWR(`https://shopee-api.deksilp.com/api/shop/${shopId}`, fetcher)
    
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}

export function getCategory(shopId) {
    
    const { data, error } = useSWR(`https://shopee-api.deksilp.com/api/getCategory/${shopId}`, fetcher)
    
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}




