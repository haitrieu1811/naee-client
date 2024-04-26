'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import isEmpty from 'lodash/isEmpty'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import usersApis from '@/apis/users.apis'
import InputPassword from '@/components/input-password'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import PATH from '@/constants/path'
import { isEntityError } from '@/lib/utils'
import { RegisterSchema, registerSchema } from '@/rules/users.rules'
import { ErrorResponse } from '@/types/utils.types'

const RegisterForm = () => {
  const form = useForm<RegisterSchema>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(registerSchema)
  })

  const registerMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: usersApis.register,
    onSuccess: () => {
      form.reset()
      toast.success('Đăng ký thành công')
    },
    onError: (error) => {
      if (isEntityError<ErrorResponse<Record<keyof RegisterSchema, string>>>(error)) {
        const errors = error.response?.data.errors
        if (!isEmpty(errors)) {
          Object.keys(errors).forEach((key) => {
            form.setError(key as keyof RegisterSchema, {
              message: errors[key as keyof RegisterSchema],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const handleSubmit = form.handleSubmit((data) => {
    const { email, password, confirmPassword } = data
    registerMutation.mutate({ email, password, confirmPassword })
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>Đăng ký</CardTitle>
        <CardDescription>Nhập thông tin của bạn để tạo tài khoản</CardDescription>
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
                      <Input id='email' type='text' placeholder='m@example.com' {...field} />
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
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nhật lại mật khẩu</FormLabel>
                    <FormControl>
                      <InputPassword {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' disabled={registerMutation.isPending} className='w-full'>
                {registerMutation.isPending && <Loader2 size={16} className='animate-spin mr-3' />}
                Tạo tài khoản
              </Button>
            </div>
          </form>
        </Form>
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
