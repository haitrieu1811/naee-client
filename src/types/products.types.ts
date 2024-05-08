import { ProductDiscountType, ProductStatus } from '@/constants/enum'
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

export type OriginalProduct = {
  _id: string
  userId: string
  productCategoryId: string
  brandId: string
  name: string
  description: string
  thumbnail: string
  photos: string[]
  status: ProductStatus
  availableCount: number
  price: number
  discountType: ProductDiscountType
  discountValue: number
  createdAt: string
  updatedAt: string
}

export type Product = {
  _id: string
  author: {
    _id: string
    email: string
    fullName: string
    createdAt: string
    updatedAt: string
  }
  category: {
    _id: string
    name: string
    description: string
    createdAt: string
    updatedAt: string
  }
  brand: {
    _id: string
    name: string
    nation: string
    description: string
    createdAt: string
    updatedAt: string
  }
  thumbnail: string
  name: string
  description: string
  photos: string[]
  status: ProductStatus
  originalPrice: number
  priceAfterDiscount: number
  availableCount: number
  createdAt: string
  updatedAt: string
}

export type ProductDetail = {
  _id: string
  author: {
    _id: string
    email: string
    fullName: string
    createdAt: string
    updatedAt: string
  }
  category: {
    _id: string
    name: string
    description: string
    createdAt: string
    updatedAt: string
  }
  brand: {
    _id: string
    name: string
    nation: string
    description: string
    createdAt: string
    updatedAt: string
  }
  thumbnail: {
    _id: string
    url: string
  }
  name: string
  description: string
  photos: {
    _id: string
    url: string
  }[]
  status: ProductStatus
  originalPrice: number
  priceAfterDiscount: number
  availableCount: number
  discountType: ProductDiscountType
  discountValue: number
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

export type CreateProductResponse = SuccessResponse<{
  product: OriginalProduct
}>

export type GetAllProductsResponse = SuccessResponse<{
  products: Product[]
  pagination: Pagination
}>

export type GetProductsResponse = SuccessResponse<{
  products: Product[]
  pagination: Pagination
}>

export type GetOneProductResponse = SuccessResponse<{
  product: ProductDetail
}>

export type CreateProductReqBody = {
  productCategoryId: string
  brandId: string
  name: string
  description: string
  thumbnail: string
  photos?: string[]
  availableCount: number
  price: number
  discountType?: ProductDiscountType
  discountValue?: number
  status: ProductStatus
}
