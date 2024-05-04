import { Metadata } from 'next'

import DashboardBrand from '@/app/(dashboard)/dashboard/brand/brand'

export const metadata: Metadata = {
  title: 'NAEE | Quản lý thương hiệu sản phẩm',
  description: 'NAEE | Quản lý thương hiệu sản phẩm'
}

const DashboardBrandPage = () => {
  return <DashboardBrand />
}

export default DashboardBrandPage
