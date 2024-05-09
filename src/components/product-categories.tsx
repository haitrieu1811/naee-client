'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import useProductCategories from '@/hooks/useProductCategories'
import PATH from '@/constants/path'

const ProductCategories = () => {
  const { productCategories } = useProductCategories({})

  return (
    <div className='bg-background shadow-sm'>
      {productCategories.map((productCategory) => (
        <Button key={productCategory._id} variant='ghost' className='w-full justify-start' asChild>
          <Link href={PATH.HOME}>{productCategory.name}</Link>
        </Button>
      ))}
    </div>
  )
}

export default ProductCategories
