import { Metadata } from 'next'

import CreateProductCategoryForm from '@/app/(dashboard)/dashboard/product-category/create-product-category-form'

export const metadata: Metadata = {
  title: 'NAEE | Tạo danh mục sản phẩm mới',
  description: 'NAEE | Tạo danh mục sản phẩm mới'
}

const DashboardProductCategoryNewPage = () => {
  return <CreateProductCategoryForm />
}

export default DashboardProductCategoryNewPage
