import { Pagination, SuccessResponse } from '@/types/utils.types'

export type OriginalProductCategory = {
  _id: string
  userId: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export type ProductCategory = {
  _id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export type CreateProductCategoryResponse = SuccessResponse<{
  productCategory: OriginalProductCategory
}>

export type UpdateProductCategoryResponse = SuccessResponse<{
  productCategory: OriginalProductCategory
}>

export type GetAllProductCategoriesResponse = SuccessResponse<{
  productCategories: ProductCategory[]
  pagination: Pagination
}>

export type GetOneCategoryResponse = SuccessResponse<{
  category: ProductCategory
}>
