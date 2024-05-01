'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import isEmpty from 'lodash/isEmpty'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import usersApis from '@/apis/users.apis'
import InputPassword from '@/components/input-password'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import PATH from '@/constants/path'
import isNotAuth from '@/hocs/isNotAuth'
import { isEntityError } from '@/lib/utils'
import { AppContext } from '@/providers/app-provider'
import { LoginSchema, loginSchema } from '@/rules/users.rules'
import { ErrorResponse } from '@/types/utils.types'

const LoginForm = () => {
  const router = useRouter()

  const form = useForm<LoginSchema>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema)
  })

  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: usersApis.login,
    onSuccess: (data) => {
      const { user } = data.data.data
      setIsAuthenticated(true)
      toast.success('Đăng nhập thành công')
      form.reset()
      router.push(PATH.HOME)
      setProfile(user)
    },
    onError: (error) => {
      if (isEntityError<ErrorResponse<Record<keyof LoginSchema, string>>>(error)) {
        const errors = error.response?.data.errors
        if (!isEmpty(errors)) {
          Object.keys(errors).forEach((key) => {
            form.setError(key as keyof LoginSchema, {
              message: errors[key as keyof LoginSchema],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const handleSubmit = form.handleSubmit((data) => {
    loginMutation.mutate(data)
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Đăng nhập</CardTitle>
        <CardDescription>Nhập email của bạn dưới đây để đăng nhập vào tài khoản của bạn</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <div className='grid gap-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='m@example.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <InputPassword {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link href={PATH.FORGOT_PASSWORD} className='ml-auto inline-block text-sm underline'>
                Quên mật khẩu?
              </Link>
              <Button type='submit' disabled={loginMutation.isPending} className='w-full'>
                {loginMutation.isPending && <Loader2 size={16} className='animate-spin mr-3' />}
                Đăng nhập
              </Button>
            </div>
          </form>
        </Form>
        <div className='mt-4 text-center text-sm'>
          Chưa có tài khoản?{' '}
          <Link href={PATH.REGISTER} className='underline'>
            Đăng ký
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default isNotAuth(LoginForm)
