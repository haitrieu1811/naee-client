'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useMemo } from 'react'

import productsApis from '@/apis/products.apis'
import ReviewItem from '@/components/review-item'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatCurrency, rateSale } from '@/lib/utils'

type ProductDetailProps = {
  productId: string
}

const ProductDetail = ({ productId }: ProductDetailProps) => {
  const getProductQuery = useQuery({
    queryKey: ['get-product', productId],
    queryFn: () => productsApis.getOneProduct(productId as string),
    enabled: !!productId
  })

  const product = useMemo(() => getProductQuery.data?.data.data.product, [getProductQuery.data?.data.data.product])
  if (!product) return

  return (
    <div className='py-5 space-y-10'>
      <div className='flex items-start gap-10 bg-background p-5 rounded-lg shadow-sm'>
        <div className='basis-1/3 space-y-3'>
          <Image
            width={200}
            height={200}
            src={product.thumbnail.url}
            alt={product.name}
            className='w-full rounded-lg object-cover'
          />
          <div>
            <Carousel className='w-full'>
              <CarouselContent className='-ml-1'>
                {product.photos.map((photo) => (
                  <CarouselItem key={photo._id} className='pl-1 basis-1/4'>
                    <div className='p-1 border rounded-lg aspect-square'>
                      <Image
                        width={100}
                        height={100}
                        src={photo.url}
                        alt={photo.url}
                        className='w-full h-full rounded-lg object-cover'
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='left-4' />
              <CarouselNext className='right-4' />
            </Carousel>
          </div>
        </div>
        <div className='flex-1 grid gap-6'>
          <h1 className='text-2xl font-medium'>{product.name}</h1>
          <div className='flex items-center gap-4'>
            <div className='font-bold text-4xl'>{formatCurrency(product.priceAfterDiscount)}&#8363;</div>
            <div className='text-xl line-through text-muted-foreground'>
              {formatCurrency(product.originalPrice)}&#8363;
            </div>
            {product.priceAfterDiscount < product.originalPrice && (
              <Badge>Giảm {rateSale(product.originalPrice, product.priceAfterDiscount)}%</Badge>
            )}
          </div>
          <div className='flex gap-4'>
            <Button variant='outline' size='lg'>
              Thêm vào giỏ hàng
            </Button>
            <Button size='lg'>Mua ngay</Button>
          </div>
        </div>
      </div>
      <div className='bg-background p-5 rounded-lg shadow-sm'>
        <Tabs defaultValue='review'>
          <TabsList>
            <TabsTrigger value='description'>Mô tả sản phẩm</TabsTrigger>
            <TabsTrigger value='review'>Đánh giá sản phẩm</TabsTrigger>
            <TabsTrigger value='same'>Sản phẩm cùng danh mục</TabsTrigger>
          </TabsList>
          <TabsContent value='description' className='text-[15px] pt-5'>
            1. Loa bluetooth mini không dây đồng hồ có Màn hình LED hiển thị lớn: LED hiển thị đồng hồ , báo thức, trạng
            thái chế độ, và nhiệt độ theo độ C . Bạn cũng có thể sử dụng nó như một chiếc gương soi. Và có thể điều
            chỉnh độ sáng 3 mức độ (BRIGHTEST, MIDDLE & LOWEST). 2. Loa bluetooth mini không dây đồng hồ có công nghệ
            Bluetooth mới nhất: Bluetooth 5.2 cho phép smartphone kết nối tới với khoảng cách lên tới 10M. Có microphone
            để nghe điện thoại ở chế độ rảnh tay. 3. Loa bluetooth mini không dây đồng hồ có chất lượng âm thanh cao
            chống ồn và tăng cường âm Bass. 4. Loa bluetooth mini không dây đồng hồ có dung lượng pin lớn 1400mAh cho
            phép chơi nhạc 8 giờ liên tiếp (tùy âm lượng). Chơi nhạc từ TF card, AUX, nó có thể đáp ứng nhu cầu của bạn
            bất cứ khi nào, nghe đài FM, tự động tìm kiếm, sạc trong 3h và sử dụng được trong 8h, nếu sử dụng đồng hồ
            thời gian sử dụng lên tới 72h. Bạn hoàn toàn có thể thưởng thức âm nhạc một cách nhẹ nhàng. 5. Loa bluetooth
            mini không dây phong cách & di động: Loa bluetooth có thiết kế gọn gàng và thẩm mỹ với các nút bấm đơn giản
            trên đỉnh giúp loa trông thời trang và dễ sử dụng. 6. Loa bluetooth mini không dây đồng hồ có thể làm quà
            tặng: Loa bluetooth thuận tiện cho bạn để mang lại và chơi nhạc bất cứ nơi nào bạn đi. Món quà hoàn hảo cho
            gia đình, bạn bè và người yêu của bạn trong Giáng sinh, sinh nhật, ngày Valentine hoặc kỷ niệm. Đặc điểm kỹ
            thuật của loa bluetooth mini không dây đồng hồ: +Thông tin sản phẩm bluetooth mini không dây có Loa
            bluetooth mini không dây có kết nối : Bluetooth 5.0, Aux, thẻ Loa bluetooth mini không dây sử dụng nguồn
            điện: Sạc pin Loa bluetooth mini không dây có dung lượng pin: 1400 mAH Màn hình gương dạng led. Loa
            bluetooth mini không dây có chức năng : Loa bluetooth , báo thức, nhiệt độ, gương soi... Loa bluetooth mini
            không dây kèm đồng hồ sang trọng. Loa Bluetooth kèm đồng hồ cực đẹp. Giúp cho căn phòng sang trọng và thanh
            lịch hơn. +Tính năng nổi bật của loa bluetooth mini không dây: Âm thanh từ loa to rõ, chắc âm, bass lớn. Khi
            sở hữu sản phẩm này vừa có một chiếc loa nhỏ gọn, một chiếc đồng hồ hiển thị thời gian, nhiệt độ và cả một
            chiếc gương để trang điểm. +Tính năng nổi bật của loa bluetooth mini không dây: Âm thanh từ loa to rõ, chắc
            âm, bass lớn. Khi sở hữu sản phẩm này vừa có một chiếc loa nhỏ gọn, một chiếc đồng hồ hiển thị thời gian,
            nhiệt độ và cả một chiếc gương để trang điểm.
          </TabsContent>
          <TabsContent value='review' className='pt-5 px-5 space-y-10'>
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <ReviewItem key={index} />
              ))}
          </TabsContent>
          <TabsContent value='same' className='pt-5 px-5 space-y-10'>
            Sản phẩm cùng danh mục
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ProductDetail
