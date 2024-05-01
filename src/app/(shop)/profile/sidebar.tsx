'use client'

import { clsx } from 'clsx'
import { NotepadText, SquarePen, Ticket, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import PATH from '@/constants/path'
import useIsClient from '@/hooks/useIsClient'
import { AppContext } from '@/providers/app-provider'

const SIDEBAR_LINKS = [
  {
    href: PATH.PROFILE,
    icon: User,
    text: 'Tài khoản của tôi',
    childrens: [
      {
        href: PATH.PROFILE,
        text: 'Hồ sơ'
      },
      {
        href: '/',
        text: 'Địa chỉ'
      },
      {
        href: '/',
        text: 'Đổi mật khẩu'
      }
    ]
  },
  {
    href: PATH.ORDERS,
    icon: NotepadText,
    text: 'Đơn mua'
  },
  {
    href: '/',
    icon: Ticket,
    text: 'Kho voucher'
  }
]

const ProfileSidebar = () => {
  const pathname = usePathname()
  const { profile } = useContext(AppContext)
  const isClient = useIsClient()

  return (
    <aside>
      {profile && isClient && (
        <div className='flex items-center space-x-4'>
          <Avatar className='w-[50px] h-[50px]'>
            <AvatarImage src={profile.avatar} alt={profile.email} />
            <AvatarFallback>{profile.email[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className='space-y-0.5'>
            <h3 className='text-[15px] font-semibold'>{profile.fullName || 'Chưa đặt tên'}</h3>
            <Link href={'/'} className='flex items-center space-x-2'>
              <SquarePen size={14} className='text-muted-foreground' />
              <span className='text-sm text-muted-foreground'>Sửa hồ sơ</span>
            </Link>
          </div>
        </div>
      )}
      <Separator className='my-6' />
      <div className='space-y-4'>
        {SIDEBAR_LINKS.map((item, index) => {
          const childrenHrefs = item.childrens?.map((item) => item.href)
          const isActive = item.href === pathname && !childrenHrefs?.includes(pathname)
          return (
            <div key={index}>
              <Link href={item.href} className='flex items-center space-x-3 group'>
                <item.icon
                  size={18}
                  className={clsx({
                    'group-hover:text-destructive': !isActive,
                    'text-destructive': isActive
                  })}
                />
                <span
                  className={clsx({
                    'text-sm font-medium': true,
                    'group-hover:text-destructive': !isActive,
                    'text-destructive': isActive
                  })}
                >
                  {item.text}
                </span>
              </Link>
              {item.childrens && item.childrens.length > 0 && (
                <div className='pl-8 space-y-3'>
                  {item.childrens.map((item, index) => {
                    const isActive = item.href === pathname
                    return (
                      <Link
                        key={index}
                        href={item.href}
                        className={clsx({
                          'block text-sm first:mt-3': true,
                          'hover:text-destructive text-muted-foreground': !isActive,
                          'text-destructive': isActive
                        })}
                      >
                        {item.text}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </aside>
  )
}

export default ProfileSidebar
