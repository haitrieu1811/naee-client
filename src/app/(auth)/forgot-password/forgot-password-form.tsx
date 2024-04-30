'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PATH from '@/constants/path'
import isNotAuth from '@/hocs/isNotAuth'

const ForgotPasswordForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Quên mật khẩu</CardTitle>
        <CardDescription>Nhập email của bạn dưới đây để yêu cầu khôi phục mật khẩu</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='m@example.com' required />
          </div>
          <Button type='submit' className='w-full'>
            Gửi yêu cầu
          </Button>
        </div>
        <div className='mt-4 text-center text-sm space-x-3'>
          <Link href={PATH.REGISTER} className='underline'>
            Đăng ký
          </Link>
          <Link href={PATH.LOGIN} className='underline'>
            Đăng nhập
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default isNotAuth(ForgotPasswordForm)
