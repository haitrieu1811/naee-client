'use client'

import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

import { columns } from '@/app/(dashboard)/dashboard/product-category/columns'
import { DataTable } from '@/components/data-table/data-table'
import { Button } from '@/components/ui/button'
import PATH from '@/constants/path'
import useProductCategories from '@/hooks/useProductCategories'

const DashboardProductCategory = () => {
  const { productCategories } = useProductCategories({})
  return (
    <div className='px-10'>
      <div className='flex justify-end'>
        <Button size='sm' className='h-7 gap-1' asChild>
          <Link href={PATH.DASHBOARD_PRODUCT_CATEGORY_NEW}>
            <PlusCircle className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Thêm danh mục sản phẩm</span>
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={productCategories} searchField='name' />
    </div>
  )
}

export default DashboardProductCategory
