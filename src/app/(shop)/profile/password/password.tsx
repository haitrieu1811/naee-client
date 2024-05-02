'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import isEmpty from 'lodash/isEmpty'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import usersApis from '@/apis/users.apis'
import Heading from '@/app/(shop)/profile/heading'
import InputPassword from '@/components/input-password'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { isEntityError } from '@/lib/utils'
import { ChangePasswordSchema, changePasswordSchema } from '@/rules/users.rules'
import { ErrorResponse } from '@/types/utils.types'
import isAuth from '@/hocs/isAuth'

const Password = () => {
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      password: '',
      confirmPassword: ''
    }
  })

  const changePasswordMutation = useMutation({
    mutationKey: ['change-password'],
    mutationFn: usersApis.changePassword,
    onSuccess: (data) => {
      const { message } = data.data
      toast.success(message)
      form.reset()
    },
    onError: (error) => {
      if (isEntityError<ErrorResponse<Record<keyof ChangePasswordSchema, string>>>(error)) {
        const errors = error.response?.data.errors
        if (!isEmpty(errors)) {
          Object.keys(errors).forEach((key) => {
            form.setError(key as keyof ChangePasswordSchema, {
              message: errors[key as keyof ChangePasswordSchema],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const onSubmit = form.handleSubmit((data) => {
    changePasswordMutation.mutate(data)
  })

  return (
    <div className='space-y-10'>
      <Heading
        title='Đổi mật khẩu'
        description='Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác'
      />
      <Form {...form}>
        <form className='space-y-8 w-2/3' onSubmit={onSubmit}>
          {/* Old password */}
          <FormField
            control={form.control}
            name='oldPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu cũ</FormLabel>
                <FormControl>
                  <InputPassword {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button type='submit' disabled={changePasswordMutation.isPending}>
            {changePasswordMutation.isPending && <Loader2 size={16} className='animate-spin mr-2' />}
            Xác nhận
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default isAuth(Password)
