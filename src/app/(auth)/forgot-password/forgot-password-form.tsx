'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import isEmpty from 'lodash/isEmpty'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import usersApis from '@/apis/users.apis'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import PATH from '@/constants/path'
import isNotAuth from '@/hocs/isNotAuth'
import { isEntityError } from '@/lib/utils'
import { ForgotPasswordSchema, forgotPasswordSchema } from '@/rules/users.rules'
import { ErrorResponse } from '@/types/utils.types'
import { Loader2 } from 'lucide-react'

const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const forgotPasswordMutation = useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: usersApis.forgotPassword,
    onSuccess: (data) => {
      const { message } = data.data
      toast.success(message)
    },
    onError: (error) => {
      if (isEntityError<ErrorResponse<Record<keyof ForgotPasswordSchema, string>>>(error)) {
        const errors = error.response?.data.errors
        if (!isEmpty(errors)) {
          Object.keys(errors).forEach((key) => {
            form.setError(key as keyof ForgotPasswordSchema, {
              message: errors[key as keyof ForgotPasswordSchema],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const handleSubmit = form.handleSubmit((data) => {
    forgotPasswordMutation.mutate(data)
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Quên mật khẩu</CardTitle>
        <CardDescription>Nhập email của bạn dưới đây để yêu cầu khôi phục mật khẩu</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='m@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={forgotPasswordMutation.isPending} className='w-full'>
              {forgotPasswordMutation.isPending && <Loader2 size={16} className='animate-spin mr-2' />}
              Gửi yêu cầu
            </Button>
          </form>
        </Form>
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
