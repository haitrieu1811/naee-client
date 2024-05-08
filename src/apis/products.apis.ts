import http from '@/lib/http'
import {
  CreateBrandResponse,
  CreateProductCategoryResponse,
  CreateProductReqBody,
  CreateProductResponse,
  GetAllBrandsResponse,
  GetAllProductCategoriesResponse,
  GetAllProductsResponse,
  GetBrandResponse,
  GetOneCategoryResponse,
  GetOneProductResponse,
  GetProductsResponse,
  UpdateBrandResponse,
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

  deleteCategory(categoryId: string) {
    return http.delete<OnlyMessageResponse>(`/products/categories/${categoryId}`)
  },

  getAllCategories(params?: PaginationReqQuery) {
    return http.get<GetAllProductCategoriesResponse>('/products/categories/all', { params })
  },

  getCategory(categoryId: string) {
    return http.get<GetOneCategoryResponse>(`/products/categories/${categoryId}`)
  },

  getAllBrands(params?: PaginationReqQuery) {
    return http.get<GetAllBrandsResponse>('/products/brands/all', { params })
  },

  getBrand(brandId: string) {
    return http.get<GetBrandResponse>(`/products/brands/${brandId}`)
  },

  createBrand(body: { name: string; nation: string; description?: string }) {
    return http.post<CreateBrandResponse>('/products/brands', body)
  },

  updateBrand({ body, brandId }: { body: { name: string; nation: string; description?: string }; brandId: string }) {
    return http.put<UpdateBrandResponse>(`/products/brands/${brandId}`, body)
  },

  deleteBrand(brandId: string) {
    return http.delete<OnlyMessageResponse>(`/products/brands/${brandId}`)
  },

  createProduct(body: CreateProductReqBody) {
    return http.post<CreateProductResponse>('/products', body)
  },

  getAllProducts(params?: PaginationReqQuery) {
    return http.get<GetAllProductsResponse>('/products/all', { params })
  },

  getProducts(params?: PaginationReqQuery) {
    return http.get<GetProductsResponse>('/products', { params })
  },

  getOneProduct(productId: string) {
    return http.get<GetOneProductResponse>(`/products/${productId}`)
  },

  updateProduct({ productId, body }: { productId: string; body: CreateProductReqBody }) {
    return http.put<OnlyMessageResponse>(`/products/${productId}`, body)
  },

  deleteProduct(productId: string) {
    return http.delete<OnlyMessageResponse>(`/products/${productId}`)
  }
} as const

export default productsApis
