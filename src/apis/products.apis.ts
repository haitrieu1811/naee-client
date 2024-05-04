import http from '@/lib/http'
import {
  CreateProductCategoryResponse,
  GetAllProductCategoriesResponse,
  GetOneCategoryResponse,
  UpdateProductCategoryResponse
} from '@/types/products.types'
import { OnlyMessageResponse, PaginationReqQuery } from '@/types/utils.types'

const productsApis = {
  createCategory(body: { name: string; description?: string }) {
    return http.post<CreateProductCategoryResponse>('/products/categories', body)
  },

  updateCategory({ body, categoryId }: { body: { name?: string; description?: string }; categoryId: string }) {
    return http.patch<UpdateProductCategoryResponse>(`/products/categories/${categoryId}`, body)
  },

  deleteOneCategory(categoryId: string) {
    return http.delete<OnlyMessageResponse>(`/products/categories/${categoryId}`)
  },

  getAllCategories(params?: PaginationReqQuery) {
    return http.get<GetAllProductCategoriesResponse>('/products/categories/all', { params })
  },

  getOneCategory(categoryId: string) {
    return http.get<GetOneCategoryResponse>(`/products/categories/${categoryId}`)
  }
} as const

export default productsApis
