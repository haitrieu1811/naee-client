'use client'

import Tippy from '@tippyjs/react/headless'
import { Check, ChevronRight, Languages, Search, ShoppingCart, SunMoon, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { default as avatar, default as image } from '@/assets/images/react.png'
import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import PATH from '@/constants/path'

const USER_LINKS = [
  {
    href: '/',
    text: 'Tài khoản của tôi'
  },
  {
    href: '/',
    text: 'Đơn mua'
  },
  {
    href: '/',
    text: 'Đăng xuất'
  }
]

const Header = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isFocusSearchBox, setIsFocusSearchBox] = useState<boolean>(false)

  const searchBoxRef = useRef<HTMLInputElement>(null)

  const { theme, setTheme } = useTheme()

  const handleResetSearch = () => {
    setSearchQuery('')
    searchBoxRef.current?.focus()
  }

  return (
    <header className='border-b bg-background'>
      <nav className='flex justify-between items-center max-w-7xl mx-auto py-2'>
        <div>
          <Link href={'/'} className='text-sm'>
            Kênh người bán
          </Link>
        </div>
        <div className='flex items-center space-x-8'>
          <Tippy
            interactive
            offset={[0, 8]}
            placement='bottom-end'
            zIndex={99999}
            render={() => (
              <div className='shadow-lg rounded-md border overflow-hidden w-[140px] bg-background'>
                <Button variant='ghost' className='flex justify-between items-center rounded-none w-full'>
                  <span>Tiếng Việt</span>
                  <Check size={16} />
                </Button>
                <Button variant='ghost' className='flex justify-between items-center rounded-none w-full'>
                  <span>Tiếng Anh</span>
                  {false && <Check size={16} />}
                </Button>
              </div>
            )}
          >
            <div className='flex items-center space-x-2'>
              <Languages size={16} />
              <span className='text-sm'>Ngôn ngữ</span>
            </div>
          </Tippy>
          <Tippy
            interactive
            offset={[0, 8]}
            placement='bottom-end'
            zIndex={99999}
            render={() => (
              <div className='shadow-lg rounded-md border overflow-hidden w-[200px] bg-background'>
                <Button
                  variant='ghost'
                  className='flex justify-between items-center rounded-none w-full'
                  onClick={() => setTheme('light')}
                >
                  <span>Giao diện sáng</span>
                  {theme === 'light' && <Check size={16} />}
                </Button>
                <Button
                  variant='ghost'
                  className='flex justify-between items-center rounded-none w-full'
                  onClick={() => setTheme('dark')}
                >
                  <span>Giao diện tối</span>
                  {theme === 'dark' && <Check size={16} />}
                </Button>
                <Button
                  variant='ghost'
                  className='flex justify-between items-center rounded-none w-full'
                  onClick={() => setTheme('system')}
                >
                  <span>Giao diện của thiết bị</span>
                  {theme === 'system' && <Check size={16} />}
                </Button>
              </div>
            )}
          >
            <div className='flex items-center space-x-2'>
              <SunMoon size={16} />
              <span className='text-sm'>Giao diện</span>
            </div>
          </Tippy>
          <div className='flex items-center'>
            <Link href={PATH.REGISTER} className='text-sm'>
              Đăng ký
            </Link>
            <Separator className='w-[1px] h-4 mx-2' />
            <Link href={PATH.LOGIN} className='text-sm'>
              Đăng nhập
            </Link>
          </div>
          {false && (
            <Tippy
              interactive
              offset={[0, 8]}
              placement='bottom-end'
              render={() => (
                <div className='shadow-lg rounded-sm bg-background border overflow-hidden'>
                  {USER_LINKS.map((item, index) => (
                    <Button key={index} variant='ghost' className='flex justify-start rounded-none pr-10' asChild>
                      <Link href={item.href}>{item.text}</Link>
                    </Button>
                  ))}
                </div>
              )}
            >
              <Link href={'/'} className='flex items-center space-x-2'>
                <Image width={20} height={20} src={avatar} alt='' className='w-5 h-5 rounded-full object-cover' />
                <span className='text-sm'>Rumble Trần</span>
              </Link>
            </Tippy>
          )}
        </div>
      </nav>
      <div className='max-w-7xl mx-auto flex items-center space-x-20 py-8'>
        <Logo />
        <div className='flex-1'>
          <Tippy
            interactive
            visible={searchQuery.length > 0 && isFocusSearchBox}
            offset={[0, 10]}
            onClickOutside={() => setIsFocusSearchBox(false)}
            render={() => (
              <div className='bg-background rounded-sm shadow-lg w-[800px] py-2 overflow-hidden'>
                {Array(2)
                  .fill(0)
                  .map((_, index) => (
                    <Button key={index} variant='ghost' className='rounded-none w-full justify-start' asChild>
                      <Link href={'/'}>
                        Loa máy tính để bàn gaming đèn led RGB, BASS cực đã, có LED, dòng loa máy tính cao cấp cho
                        laptop, pc, điện thoại
                      </Link>
                    </Button>
                  ))}
                <Button
                  variant='ghost'
                  className='rounded-none w-full justify-end space-x-2 text-blue-600 hover:text-blue-700'
                >
                  <span>Xem thêm</span>
                  <ChevronRight size={16} />
                </Button>
              </div>
            )}
          >
            <div className='relative flex justify-center w-[800px]'>
              <Input
                ref={searchBoxRef}
                value={searchQuery}
                className='rounded-sm w-[800px] pr-[220px]'
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocusSearchBox(true)}
              />
              {!!searchQuery && (
                <div className='flex items-center justify-center space-x-2 absolute right-2 top-1/2 -translate-y-1/2 bg-background w-[200px]'>
                  <Button size='sm' variant='secondary' className='h-6 space-x-2' onClick={handleResetSearch}>
                    <X size={16} />
                    <span>Đặt lại</span>
                  </Button>
                  <Button size='sm' variant='secondary' className='h-6 space-x-2'>
                    <Search size={16} />
                    <span>Tìm kiếm</span>
                  </Button>
                </div>
              )}
            </div>
          </Tippy>
        </div>
        <div className='pr-10'>
          <Tippy
            interactive
            placement='bottom-end'
            offset={[0, 10]}
            render={() => (
              <div className='bg-background rounded-sm shadow-lg border w-[350px]'>
                <div className='px-4 pt-3'>
                  <h3 className='tracking-tight text-sm'>Sản phẩm trong giỏ hàng</h3>
                </div>
                <Separator className='my-1.5' />
                <div>
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <Link
                        key={index}
                        href={'/'}
                        className='flex justify-between items-center space-x-4 px-4 py-2 hover:bg-muted'
                      >
                        <Image
                          width={40}
                          height={40}
                          src={image}
                          alt=''
                          className='w-10 h-10 rounded-sm object-cover'
                        />
                        <div className='flex-1'>
                          <span className='line-clamp-1 text-sm'>
                            Loa máy tính để bàn gaming đèn led RGB, BASS cực đã, có LED, dòng loa máy tính cao cấp cho
                            laptop, pc, điện thoại.
                          </span>
                          <span className='text-xs text-muted-foreground'>Số lượng: 10</span>
                        </div>
                        <span className='font-semibold text-sm'>280.000&#8363;</span>
                      </Link>
                    ))}
                </div>
                <Separator className='my-1.5' />
                <div className='flex justify-end space-x-2 px-4 py-2'>
                  <Button variant='outline' className='text-sm rounded-sm'>
                    Thanh toán
                  </Button>
                  <Button className='text-sm rounded-sm bg-blue-600 hover:bg-blue-700 text-background'>
                    Xem giỏ hàng
                  </Button>
                </div>
              </div>
            )}
          >
            <Link href={'/'} className='relative'>
              <ShoppingCart strokeWidth={1.5} />
              <span className='w-5 h-5 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs absolute -top-2.5 -right-2.5 flex justify-center items-center font-bold'>
                9+
              </span>
            </Link>
          </Tippy>
        </div>
      </div>
    </header>
  )
}

export default Header