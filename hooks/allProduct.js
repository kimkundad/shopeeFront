import useSWR from "swr"
import { fetcher } from "@/services/test"

export function getAllProduct(shop_id) {
    
    const { data, error } = useSWR(`https://shopee-api.deksilp.com/api/allProduct/${shop_id}`, fetcher)
    
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

export function getAllCategory() {
    
    const { data, error } = useSWR(`https://shopee-api.deksilp.com/api/get_category_all`, fetcher)
    
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}




