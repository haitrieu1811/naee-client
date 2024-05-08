import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import PATH from '@/constants/path'
import { formatCurrency, rateSale } from '@/lib/utils'
import { Product } from '@/types/products.types'

type ProductItemProps = {
  productData: Product
}

const ProductItem = ({ productData }: ProductItemProps) => {
  return (
    <div className='space-y-4 shadow-sm'>
      <Link href={PATH.HOME}>
        <Image
          width={200}
          height={200}
          src={productData.thumbnail}
          alt={productData.name}
          className='object-cover w-full h-[180px] rounded-lg'
        />
      </Link>
      <Link href={PATH.HOME} className='line-clamp-2 font-medium text-sm'>
        {productData.name}
      </Link>
      <div>
        <Badge variant='outline'>{productData.category.name}</Badge>
      </div>
      <div className='flex justify-between items-end'>
        <div className='space-y-0.5'>
          <div className='font-semibold'>{formatCurrency(productData.priceAfterDiscount)}đ</div>
          <div className='flex items-center space-x-2'>
            <div className='text-muted-foreground line-through text-xs'>
              {formatCurrency(productData.originalPrice)}đ
            </div>
            {productData.priceAfterDiscount < productData.originalPrice && (
              <Badge variant='outline' className='border-destructive text-destructive'>
                -{rateSale(productData.originalPrice, productData.priceAfterDiscount)}%
              </Badge>
            )}
          </div>
        </div>
        <div className='text-muted-foreground text-xs'>Đã bán: 14k</div>
      </div>
    </div>
  )
}

export default ProductItem
