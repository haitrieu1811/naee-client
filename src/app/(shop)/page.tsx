import Image from 'next/image'

import BestSellers from '@/app/(shop)/_components/best-sellers'
import banner1 from '@/assets/images/banner1.webp'
import banner2 from '@/assets/images/banner2.webp'
import banner3 from '@/assets/images/banner3.webp'
import banner4 from '@/assets/images/banner4.webp'
import banner5 from '@/assets/images/banner5.webp'
import banner6 from '@/assets/images/banner6.webp'
import banner7 from '@/assets/images/banner7.webp'
import ProductCategories from '@/components/product-categories'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

const banners = [banner1, banner2, banner3, banner4, banner5, banner6, banner7]

const HomePage = () => {
  return (
    <div className='grid gap-10'>
      <div className='grid grid-cols-12 gap-10 mt-3'>
        <div className='col-span-3 max-h-[400px] overflow-y-auto'>
          <ProductCategories />
        </div>
        <div className='col-span-9 h-[400px]'>
          <Carousel>
            <CarouselContent>
              {banners.map((banner, index) => (
                <CarouselItem key={index}>
                  <Image
                    width={800}
                    height={236}
                    src={banner}
                    alt={index.toString()}
                    className='w-full h-[400px] object-cover rounded-lg'
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='left-2' />
            <CarouselNext className='right-2' />
          </Carousel>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className='text-xl'>Sản phẩm bán chạy</CardTitle>
          <CardDescription>Danh sách sản phẩm bán chạy nhất trong tháng 05</CardDescription>
        </CardHeader>
        <CardContent>
          <BestSellers />
        </CardContent>
      </Card>
    </div>
  )
}

export default HomePage
