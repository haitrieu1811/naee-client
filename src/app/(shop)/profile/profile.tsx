'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import isEmpty from 'lodash/isEmpty'
import { Loader2 } from 'lucide-react'
import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import filesApis from '@/apis/files.apis'
import usersApis from '@/apis/users.apis'
import Heading from '@/app/(shop)/profile/heading'
import InputFile from '@/components/input-file'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UserVerifyStatus } from '@/constants/enum'
import isAuth from '@/hocs/isAuth'
import { isEntityError } from '@/lib/utils'
import { AppContext } from '@/providers/app-provider'
import { UpdateMeSchema, updateMeSchema } from '@/rules/users.rules'
import { ErrorResponse } from '@/types/utils.types'

const Profile = () => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  const { setProfile } = useContext(AppContext)

  const form = useForm<UpdateMeSchema>({
    defaultValues: {
      fullName: '',
      phoneNumber: ''
    },
    resolver: zodResolver(updateMeSchema)
  })

  const avatarPreview = useMemo(() => (avatarFile ? URL.createObjectURL(avatarFile) : null), [avatarFile])

  const handleChangeAvatar = (files?: File[]) => {
    if (!files) return
    if (files.length === 0) return
    setAvatarFile(files[0])
  }

  const getMeQuery = useQuery({
    queryKey: ['getMe'],
    queryFn: () => usersApis.getMe()
  })

  const me = useMemo(() => getMeQuery.data?.data.data.user, [getMeQuery.data?.data.data.user])

  useEffect(() => {
    if (!me) return
    form.setValue('fullName', me.fullName)
    form.setValue('phoneNumber', me.phoneNumber)
  }, [form, me])

  const uploadImageMutation = useMutation({
    mutationKey: ['upload-image'],
    mutationFn: filesApis.uploadImage
  })

  const updateMeMutation = useMutation({
    mutationKey: ['updateMe'],
    mutationFn: usersApis.updateMe,
    onSuccess: (data) => {
      const { user } = data.data.data
      toast.success('Cập nhật hồ sơ thành công')
      getMeQuery.refetch()
      setProfile(user)
      setAvatarFile(null)
    },
    onError: (error) => {
      if (isEntityError<ErrorResponse<Record<keyof UpdateMeSchema, string>>>(error)) {
        const errors = error.response?.data.errors
        if (!isEmpty(errors)) {
          Object.keys(errors).forEach((key) => {
            form.setError(key as keyof UpdateMeSchema, {
              message: errors[key as keyof UpdateMeSchema],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const isPending = uploadImageMutation.isPending || updateMeMutation.isPending

  const onSubmit = form.handleSubmit(async (data) => {
    let avatar: undefined | string = undefined
    if (avatarFile) {
      const form = new FormData()
      form.append('image', avatarFile)
      try {
        const res = await uploadImageMutation.mutateAsync(form)
        const { _id } = res.data.data.images[0]
        avatar = _id
      } catch (error) {
        console.log(error)
      }
    }
    const { fullName, phoneNumber } = data
    updateMeMutation.mutate({
      fullName,
      phoneNumber,
      avatar
    })
  })

  const resendEmailVerifyMutation = useMutation({
    mutationKey: ['resend-email-verify'],
    mutationFn: usersApis.resendEmailVerify,
    onSuccess: (data) => {
      const { message } = data.data
      toast.success(message)
    }
  })

  const handleResendEmailVerify = () => {
    resendEmailVerifyMutation.mutate()
  }

  return (
    <Fragment>
      <Heading title='Hồ sơ của tôi' description='Quản lý thông tin hồ sơ để bảo mật tài khoản' />
      <div className='grid grid-cols-12 gap-10 pb-10'>
        <div className='col-span-8 space-y-8'>
          {me?.verify === UserVerifyStatus.Unverified && (
            <Alert variant='destructive' className='mt-5'>
              <ExclamationTriangleIcon className='h-4 w-4' />
              <AlertTitle>Cảnh báo</AlertTitle>
              <AlertDescription>
                Tài khoản của bạn chưa được xác thực, hãy xác thực tài khoản để tài khoản không bị giới hạn. Kiểm tra
                mail của bạn hoặc
                <Button
                  variant='link'
                  disabled={resendEmailVerifyMutation.isPending}
                  className='h-auto py-0 px-1'
                  onClick={handleResendEmailVerify}
                >
                  {resendEmailVerifyMutation.isPending && <Loader2 size={12} className='animate-spin mr-1' />}
                  gửi lại mail xác thực
                </Button>
                nếu mail đã hết hiệu lực.
              </AlertDescription>
            </Alert>
          )}
          <div className='mt-10 space-y-2'>
            <div className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Email
            </div>
            <div className='text-muted-foreground text-sm'>{me?.email}</div>
          </div>
          <Form {...form}>
            <form className='mt-8 space-y-8' onSubmit={onSubmit}>
              <FormField
                control={form.control}
                name='fullName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ tên</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' disabled={isPending}>
                {isPending && <Loader2 size={14} className='animate-spin mr-2' />}
                Lưu lại
              </Button>
            </form>
          </Form>
        </div>
        <div className='col-span-4'>
          <div className='flex flex-col items-center'>
            {me && (
              <Avatar className='w-[100px] h-[100px] mb-6'>
                <AvatarImage src={avatarPreview || me.avatar} alt={me.email} />
                <AvatarFallback>{me.email[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            )}
            {!avatarPreview && (
              <InputFile onChange={(files) => handleChangeAvatar(files)}>
                <Button variant='outline'>Chọn ảnh</Button>
              </InputFile>
            )}
            {avatarPreview && (
              <Button variant='destructive' onClick={() => setAvatarFile(null)}>
                Hủy bỏ
              </Button>
            )}
            <div className='space-y-1 text-center mt-6 text-sm text-muted-foreground'>
              <div>Dụng lượng file tối đa 300 KB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default isAuth(Profile)
