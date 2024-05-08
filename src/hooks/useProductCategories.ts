import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import productsApis from '@/apis/products.apis'

type UseProductCategoriesProps = {
  limit?: number
}

const useProductCategories = ({ limit = 1000 }: UseProductCategoriesProps) => {
  const getAllProductCategories = useQuery({
    queryKey: ['get-all-product-categories'],
    queryFn: () => productsApis.getAllCategories({ limit })
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
