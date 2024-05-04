'use client'

import CreateProductForm from '@/app/(dashboard)/dashboard/product/create-product-form'

const DashboardProductNew = () => {
  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <CreateProductForm />
    </main>
  )
}

export default DashboardProductNew
