import { Metadata } from 'next'

import Dashboard from '@/app/(dashboard)/dashboard/dashboard'

export const metadata: Metadata = {
  title: 'NAEE | Dashboard',
  description: 'NAEE | Dashboard'
}

const DashboardPage = () => {
  return <Dashboard />
}

export default DashboardPage
