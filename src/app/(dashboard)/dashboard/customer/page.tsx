import { Metadata } from 'next'

import DashboardCustomer from '@/app/(dashboard)/dashboard/customer/customer'

export const metadata: Metadata = {
  title: 'NAEE | Quản lý khách hàng',
  description: 'NAEE | Quản lý khách hàng'
}

const DashboardCustomerPage = () => {
  return <DashboardCustomer />
}

export default DashboardCustomerPage
