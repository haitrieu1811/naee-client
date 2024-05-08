import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import productsApis from '@/apis/products.apis'

type UseBrandsProps = {
  limit?: number
}

const useBrands = ({ limit = 1000 }: UseBrandsProps) => {
  const getAllBrandsQuery = useQuery({
    queryKey: ['get-all-brands'],
    queryFn: () => productsApis.getAllBrands({ limit })
  })

  const brands = useMemo(
    () => getAllBrandsQuery.data?.data.data.brands || [],
    [getAllBrandsQuery.data?.data.data.brands]
  )

  return {
    getAllBrandsQuery,
    brands
  }
}

export default useBrands
