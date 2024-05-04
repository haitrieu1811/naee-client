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

export type Brand = {
  _id: string
  name: string
  nation: string
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

export type GetAllBrandsResponse = SuccessResponse<{
  brands: Brand[]
  pagination: Pagination
}>

export type CreateBrandResponse = SuccessResponse<{
  brand: Brand
}>

export type UpdateBrandResponse = SuccessResponse<{
  brand: Brand
}>

export type GetBrandResponse = SuccessResponse<{
  brand: Brand
}>
