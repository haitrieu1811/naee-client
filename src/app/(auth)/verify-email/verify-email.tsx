'use client'

import { useMutation } from '@tanstack/react-query'
import { CheckCircle, CircleX } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'

import usersApis from '@/apis/users.apis'
import PATH from '@/constants/path'

const VerifyEmail = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const verifyEmailToken = searchParams.get('token')

  const [count, setCount] = useState<number>(5)

  const verifyEmailMutation = useMutation({
    mutationKey: ['verify-email'],
    mutationFn: usersApis.verifyEmail
  })

  useEffect(() => {
    if (!verifyEmailToken) return
    ;(async () => await verifyEmailMutation.mutateAsync({ verifyEmailToken }))()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (count > 0) {
        setCount((prevState) => (prevState -= 1))
      } else {
        router.push(PATH.HOME)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [count, router])

  return (
    <Fragment>
      {verifyEmailMutation.isSuccess && (
        <div className='flex flex-col items-center py-20 space-y-10'>
          <CheckCircle size={100} className='stroke-green-500' />
          <div className='text-center space-y-2'>
            <div className='text-3xl text-green-500'>Xác thực tài khoản thành công</div>
            <div className='text-xl'>
              Bạn sẽ được chuyển đến trang chủ sau{' '}
              <span className='font-bold underline text-red-500 text-2xl'>{count}</span> giây
            </div>
          </div>
        </div>
      )}

      {verifyEmailMutation.isError && (
        <div className='flex flex-col items-center py-20 space-y-10'>
          <CircleX size={100} className='stroke-red-500' />
          <div className='text-center space-y-2'>
            <div className='text-3xl text-red-500'>Token không hợp lệ hoặc mail đã hết hiệu lực</div>
            <div className='text-xl'>
              Bạn sẽ được chuyển đến trang chủ sau{' '}
              <span className='font-bold underline text-red-500 text-2xl'>{count}</span> giây
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default VerifyEmail
