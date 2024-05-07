import { Metadata } from 'next'

import DashboardProductUpdate from '@/app/(dashboard)/dashboard/product/[id]/product-update'

export const metadata: Metadata = {
  title: 'NAEE | Cập nhật thông tin sản phẩm',
  description: 'NAEE | Cập nhật thông tin sản phẩm'
}

type DashboardProductUpdatePageProps = {
  params: {
    id: string
  }
}

const DashboardProductUpdatePage = ({ params }: DashboardProductUpdatePageProps) => {
  const { id } = params
  return <DashboardProductUpdate productId={id} />
}

export default DashboardProductUpdatePage
