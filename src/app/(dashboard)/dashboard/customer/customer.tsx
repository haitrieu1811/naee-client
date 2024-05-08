'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import usersApis from '@/apis/users.apis'
import { columns } from '@/app/(dashboard)/dashboard/customer/columns'
import { DataTable } from '@/components/data-table/data-table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const DashboardCustomer = () => {
  const getAllCustomersQuery = useQuery({
    queryKey: ['get-all-customers'],
    queryFn: () => usersApis.getAllCustomers()
  })

  const customers = useMemo(
    () => getAllCustomersQuery.data?.data.data.customers || [],
    [getAllCustomersQuery.data?.data.data.customers]
  )

  return (
    <div className='p-5'>
      <Card>
        <CardHeader>
          <CardTitle>Quản lý khách hàng</CardTitle>
          <CardDescription>Danh sách toàn bộ khách hàng hiện có trên hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={customers} columns={columns} searchField='email' />
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardCustomer
