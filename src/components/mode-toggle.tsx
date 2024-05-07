'use client'

import { SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const ModeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm' className='space-x-2'>
          <SunMoon size={16} />
          <span className='text-sm'>Giao diện</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem className='pr-10' onClick={() => setTheme('light')}>
          Giao diện sáng
        </DropdownMenuItem>
        <DropdownMenuItem className='pr-10' onClick={() => setTheme('dark')}>
          Giao diện tối
        </DropdownMenuItem>
        <DropdownMenuItem className='pr-10' onClick={() => setTheme('system')}>
          Giao diện của thiết bị
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ModeToggle
