'use client'

import ProductItem from '@/components/product-item'
import useProducts from '@/hooks/useProducts'

const BestSellers = () => {
  const { products } = useProducts({})

  return (
    <div className='grid grid-cols-10 gap-5'>
      {products.map((product) => (
        <div key={product._id} className='col-span-2'>
          <ProductItem productData={product} />
        </div>
      ))}
    </div>
  )
}

export default BestSellers
