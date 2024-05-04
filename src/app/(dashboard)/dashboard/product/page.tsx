import { Metadata } from 'next'

import DashboardProduct from '@/app/(dashboard)/dashboard/product/product'

export const metadata: Metadata = {
  title: 'NAEE | Quản lý sản phẩm',
  description: 'NAEE | Quản lý sản phẩm'
}

const DashboardProductsPage = () => {
  return <DashboardProduct />
}

export default DashboardProductsPage
