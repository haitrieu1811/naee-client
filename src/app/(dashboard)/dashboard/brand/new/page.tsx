import { Metadata } from 'next'

import CreateBrandForm from '@/app/(dashboard)/dashboard/brand/create-brand-form'

export const metadata: Metadata = {
  title: 'NAEE | Tạo nhãn hiệu mới',
  description: 'NAEE | Tạo nhãn hiệu mới'
}

const DashboardBrandNewPage = () => {
  return <CreateBrandForm />
}

export default DashboardBrandNewPage
