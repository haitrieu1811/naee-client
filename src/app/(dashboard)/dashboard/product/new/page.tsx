import { Metadata } from 'next'

import DashboardProductNew from '@/app/(dashboard)/dashboard/product/new/new'

export const metadata: Metadata = {
  title: 'NAEE | Tạo sản phẩm mới',
  description: 'NAEE | Tạo sản phẩm mới'
}

const DashboardProductNewPage = () => {
  return <DashboardProductNew />
}

export default DashboardProductNewPage
