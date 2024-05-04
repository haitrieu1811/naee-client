import { Metadata } from 'next'

import CreateProductCategoryForm from '@/app/(dashboard)/dashboard/product-category/create-product-category-form'

export const metadata: Metadata = {
  title: 'NAEE | Cập nhật danh mục sản phẩm',
  description: 'NAEE | Cập nhật danh mục sản phẩm'
}

type DashboardProductCategoryUpdatePageProps = {
  params: {
    id: string
  }
}

const DashboardProductCategoryUpdatePage = ({ params }: DashboardProductCategoryUpdatePageProps) => {
  const { id } = params
  return <CreateProductCategoryForm productCategoryId={id} />
}

export default DashboardProductCategoryUpdatePage
