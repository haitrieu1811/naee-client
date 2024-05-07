import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import productsApis from '@/apis/products.apis'

const useProductCategories = () => {
  const getAllProductCategories = useQuery({
    queryKey: ['get-all-product-categories'],
    queryFn: () => productsApis.getAllCategories()
  })

  const productCategories = useMemo(
    () => getAllProductCategories.data?.data.data.productCategories || [],
    [getAllProductCategories.data?.data.data.productCategories]
  )

  return {
    productCategories,
    getAllProductCategories
  }
}

export default useProductCategories
