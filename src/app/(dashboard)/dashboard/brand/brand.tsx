'use client'

import { useQuery } from '@tanstack/react-query'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'

import productsApis from '@/apis/products.apis'
import { columns } from '@/app/(dashboard)/dashboard/brand/columns'
import { DataTable } from '@/components/data-table/data-table'
import { Button } from '@/components/ui/button'
import PATH from '@/constants/path'

const DashboardBrand = () => {
  const getAllBrandsQuery = useQuery({
    queryKey: ['get-all-brands'],
    queryFn: () => productsApis.getAllBrands()
  })

  const brands = useMemo(
    () => getAllBrandsQuery.data?.data.data.brands || [],
    [getAllBrandsQuery.data?.data.data.brands]
  )

  return (
    <div className='px-10'>
      <div className='flex justify-end'>
        <Button size='sm' className='h-7 gap-1' asChild>
          <Link href={PATH.DASHBOARD_PRODUCT_BRAND_NEW}>
            <PlusCircle className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Thêm danh mục sản phẩm</span>
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={brands} searchField='name' />
    </div>
  )
}

export default DashboardBrand
