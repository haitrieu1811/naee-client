import Link from 'next/link'

import InputPassword from '@/components/input-password'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PATH from '@/constants/path'

const RegisterForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>Đăng ký</CardTitle>
        <CardDescription>Nhập thông tin của bạn để tạo tài khoản</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='m@example.com' required />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Mật khẩu</Label>
            <InputPassword id='password' name='password' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='confirmPassword'>Nhập lại mật khẩu</Label>
            <InputPassword id='confirmPassword' name='confirmPassword' />
          </div>
          <Button type='submit' className='w-full'>
            Tạo tài khoản
          </Button>
        </div>
        <div className='mt-4 text-center text-sm'>
          Bạn đã có tài khoản?{' '}
          <Link href={PATH.LOGIN} className='underline'>
            Đăng nhập
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default RegisterForm
