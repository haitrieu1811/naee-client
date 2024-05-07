'use client'

import { useQuery } from '@tanstack/react-query'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'

import productsApis from '@/apis/products.apis'
import { columns } from '@/app/(dashboard)/dashboard/product/columns'
import { DataTable } from '@/components/data-table/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import PATH from '@/constants/path'

const DashboardProduct = () => {
  const getAllProductsQuery = useQuery({
    queryKey: ['get-all-products'],
    queryFn: () => productsApis.getAllProducts()
  })

  const products = useMemo(
    () => getAllProductsQuery.data?.data.data.products || [],
    [getAllProductsQuery.data?.data.data.products]
  )

  return (
    <main className='p-5'>
      <Card>
        <CardHeader>
          <CardTitle>Quản lý sản phẩm</CardTitle>
          <CardDescription>Quản lý sản phẩm đã tạo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex justify-end mb-8'>
            <Button size='sm' className='space-x-2' asChild>
              <Link href={PATH.DASHBOARD_PRODUCT_NEW}>
                <PlusCircle size={14} />
                <span>Tạo sản phẩm mới</span>
              </Link>
            </Button>
          </div>
          <DataTable columns={columns} data={products} searchField='name' />
        </CardContent>
      </Card>
    </main>
  )
}

export default DashboardProduct
