'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import isEmpty from 'lodash/isEmpty'
import { Loader2, XCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import usersApis from '@/apis/users.apis'
import InputPassword from '@/components/input-password'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import isNotAuth from '@/hocs/isNotAuth'
import { isEntityError } from '@/lib/utils'
import { ResetPasswordSchema, resetPasswordSchema } from '@/rules/users.rules'
import { ErrorResponse } from '@/types/utils.types'

const ResetPassword = () => {
  const searchParams = useSearchParams()
  const forgotPasswordToken = searchParams.get('token')

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const verifyForgotPasswordTokenMutation = useMutation({
    mutationKey: ['verify-forgot-password-token'],
    mutationFn: usersApis.verifyForgotPasswordToken
  })

  // Run verifyForgotPasswordTokenMutation
  useEffect(() => {
    if (!forgotPasswordToken) return
    verifyForgotPasswordTokenMutation.mutate({ forgotPasswordToken })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forgotPasswordToken])

  const resetPasswordMutation = useMutation({
    mutationKey: ['reset-password'],
    mutationFn: usersApis.resetPassword,
    onSuccess: (data) => {
      const { message } = data.data
      toast.success(message)
      form.reset()
    },
    onError: (error) => {
      if (isEntityError<ErrorResponse<Record<keyof ResetPasswordSchema, string>>>(error)) {
        const errors = error.response?.data.errors
        if (!isEmpty(errors)) {
          Object.keys(errors).forEach((key) => {
            form.setError(key as keyof ResetPasswordSchema, {
              message: errors[key as keyof ResetPasswordSchema],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const onSubmit = form.handleSubmit((data) => {
    if (!forgotPasswordToken) return
    resetPasswordMutation.mutate({
      ...data,
      forgotPasswordToken
    })
  })

  return (
    <div className='py-20'>
      {/* On error */}
      {verifyForgotPasswordTokenMutation.isError && (
        <div className='flex justify-center items-center flex-col space-y-10'>
          <XCircle size={100} className='stroke-destructive' />
          <div className='text-3xl text-red-500'>Token đã hết hạn hoặc không đúng</div>
        </div>
      )}
      {/* On success */}
      {verifyForgotPasswordTokenMutation.isSuccess && (
        <Form {...form}>
          <form className='space-y-8 max-w-xl mx-auto' onSubmit={onSubmit}>
            {/* Password */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <InputPassword {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Confirm password */}
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhập lại mật khẩu mới</FormLabel>
                  <FormControl>
                    <InputPassword {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit */}
            <Button type='submit' disabled={resetPasswordMutation.isPending}>
              {resetPasswordMutation.isPending && <Loader2 size={16} className='animate-spin mr-2' />}
              Xác nhận
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}

export default isNotAuth(ResetPassword)
