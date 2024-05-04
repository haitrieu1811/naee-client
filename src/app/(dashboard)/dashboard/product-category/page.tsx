import { Metadata } from 'next'

import DashboardProductCategory from '@/app/(dashboard)/dashboard/product-category/product-category'

export const metadata: Metadata = {
  title: 'NAEE | Quản lý danh mục sản phẩm',
  description: 'NAEE | Quản lý danh mục sản phẩm'
}

const DashboardProductCategoryPage = () => {
  return <DashboardProductCategory />
}

export default DashboardProductCategoryPage
