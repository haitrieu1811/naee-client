'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import CreateProductForm from '@/app/(dashboard)/dashboard/product/create-product-form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const DashboardProductNew = () => {
  const router = useRouter()
  return (
    <main className='mx-auto grid max-w-[59rem] gap-4'>
      <div className='flex items-center gap-4'>
        <Button variant='outline' size='icon' className='h-7 w-7' onClick={() => router.back()}>
          <ChevronLeft className='h-4 w-4' />
          <span className='sr-only'>Back</span>
        </Button>
        <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
          Thêm sản phẩm mới
        </h1>
        <Badge variant='outline' className='ml-auto sm:ml-0'>
          Bản nháp
        </Badge>
      </div>
      <CreateProductForm />
    </main>
  )
}

export default DashboardProductNew
