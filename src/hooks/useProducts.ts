'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import productsApis from '@/apis/products.apis'
import { Product } from '@/types/products.types'

type UseProductsProps = {
  limit?: number
}

const useProducts = ({ limit = 20 }: UseProductsProps) => {
  const [products, setProducts] = useState<Product[]>([])

  const getProductQuery = useInfiniteQuery({
    queryKey: ['get-products'],
    queryFn: ({ pageParam }) => productsApis.getProducts({ page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.data.data.pagination.page < lastPage.data.data.pagination.totalPages
        ? lastPage.data.data.pagination.page + 1
        : undefined
  })

  useEffect(() => {
    if (!getProductQuery.data) return
    const responseProducts = getProductQuery.data.pages.flatMap((page) => page.data.data.products)
    setProducts(responseProducts)
  }, [getProductQuery.data])

  return {
    products,
    getProductQuery
  }
}

export default useProducts
