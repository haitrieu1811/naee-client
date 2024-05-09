import { Ellipsis, Star } from 'lucide-react'
import Image from 'next/image'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import image from '@/assets/images/react.png'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

const ReviewItem = () => {
  return (
    <div className='flex items-start space-x-3'>
      <div className='flex-shrink-0'>
        <Avatar>
          <AvatarImage src={''} alt='' />
          <AvatarFallback>H</AvatarFallback>
        </Avatar>
      </div>
      <div className='flex-1 space-y-4'>
        <div className='space-y-1'>
          <h3 className='text-xs'>Haitrieu1811</h3>
          <div className='flex items-center space-x-0.5'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <Star key={index} size={16} className='fill-yellow-500 stroke-transparent' />
              ))}
          </div>
          <p className='text-xs text-muted-foreground'>2023-07-11 14:45</p>
        </div>
        <p className='text-sm'>Khá là tốt để nghe nhạc để xem giờ báo thức để gọi điện</p>
        <div className='flex space-x-2'>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Image
                key={index}
                src={image}
                alt=''
                className='aspect-square w-[72px] h-[72px] rounded-lg object-cover'
              />
            ))}
        </div>
        <div className='bg-muted p-4 rounded-lg space-y-2'>
          <h3 className='font-medium text-sm'>Phản hồi của người bán</h3>
          <div className='text-sm text-muted-foreground'>
            Dạ cảm ơn a/c đã ủng hộ và đóng góp ý kiến, về việc giao sai màu thật sư bên e sơ suất nên đã nhắn đê được
            đổi lại cho mình đó ạ. Còn hàng phải sạc mới dùng được ạ. Với giá thành vậy là chất lượng ổn, nếu sản phẩm
            lỗi bên e sẽ đổi trả miễn phí hoặc hoàn tiền
          </div>
        </div>
      </div>
      <div className='flex flex-shrink-0'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant='ghost' size='icon'>
              <Ellipsis className='w-4 h-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>Cập nhật</DropdownMenuItem>
            <DropdownMenuItem>Xóa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default ReviewItem
