import { Metadata } from 'next'

import DashboardProductCategoryNew from '@/app/(dashboard)/dashboard/product-category/new/new'

export const metadata: Metadata = {
  title: 'NAEE | Tạo danh mục sản phẩm mới',
  description: 'NAEE | Tạo danh mục sản phẩm mới'
}

const DashboardProductCategoryNewPage = () => {
  return <DashboardProductCategoryNew />
}

export default DashboardProductCategoryNewPage
