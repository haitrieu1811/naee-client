'use client'

import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useContext } from 'react'
import { toast } from 'sonner'

import usersApis from '@/apis/users.apis'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import PATH from '@/constants/path'
import { AppContext } from '@/providers/app-provider'

const AccountDropdown = () => {
  const { profile, setIsAuthenticated, setProfile } = useContext(AppContext)

  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: usersApis.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      toast.success('Đăng xuất thành công')
    }
  })

  if (!profile) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='space-x-3' asChild>
        <Button variant='ghost' size='sm'>
          <Avatar className='w-5 h-5'>
            <AvatarImage src={profile.avatar} alt={profile.fullName} />
            <AvatarFallback>{profile.email[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className='text-sm'>{!!profile?.fullName ? profile.fullName : profile?.email}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>{profile.email}</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={PATH.PROFILE}>Tài khoản của tôi</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={PATH.ORDERS}>Đơn mua</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logoutMutation.mutate()}>Đăng xuất</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountDropdown
