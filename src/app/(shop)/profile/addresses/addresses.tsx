'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { Loader2, Plus } from 'lucide-react'
import { Fragment, useMemo, useState } from 'react'
import { toast } from 'sonner'

import addressesApis from '@/apis/addresses.apis'
import CreateAddressForm from '@/app/(shop)/profile/addresses/create-address-form'
import Heading from '@/app/(shop)/profile/heading'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import isAuth from '@/hocs/isAuth'

const Addresses = () => {
  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState<boolean>(false)
  const [currentUpdatedAddressId, setCurrentUpdatedAddressId] = useState<null | string>(null)
  const [currentDeletionAddressId, setCurrentDeletionAddressId] = useState<null | string>(null)

  const getMyAddressesQuery = useQuery({
    queryKey: ['get-my-addresses'],
    queryFn: () => addressesApis.getMyAddresses()
  })

  const myAddresses = useMemo(
    () => getMyAddressesQuery.data?.data.data.addresses || [],
    [getMyAddressesQuery.data?.data.data.addresses]
  )

  const setDefaultAddressMutation = useMutation({
    mutationKey: ['set-default-address'],
    mutationFn: addressesApis.setDefault,
    onSuccess: (data) => {
      const { message } = data.data
      toast.success(message)
      getMyAddressesQuery.refetch()
    }
  })

  const deleteAddressMutation = useMutation({
    mutationKey: ['delete-address'],
    mutationFn: addressesApis.deleteOne,
    onSuccess: (data) => {
      const { message } = data.data
      toast.success(message)
      getMyAddressesQuery.refetch()
    }
  })

  const handleSetDefaultAddress = (addressId: string) => {
    setDefaultAddressMutation.mutate(addressId)
  }

  const handleStartUpdateAddress = (addressId: string) => {
    setCurrentUpdatedAddressId(addressId)
  }

  const handleStartDeleteAddress = (addressId: string) => {
    setCurrentDeletionAddressId(addressId)
  }

  return (
    <Fragment>
      <Heading title='Địa chỉ nhận hàng' description='Thêm địa chỉ nhận hàng để tiện lợi hơn trong việc mua sắm' />
      <div className='flex justify-end mt-5'>
        <Dialog open={isOpenCreateDialog} onOpenChange={(value) => setIsOpenCreateDialog(value)}>
          <DialogTrigger asChild>
            <Button>
              <Plus size={16} className='mr-2' />
              Thêm địa chỉ
            </Button>
          </DialogTrigger>
          <DialogContent className='max-w-2xl'>
            <DialogHeader>
              <DialogTitle>Tạo địa chỉ mới</DialogTitle>
            </DialogHeader>
            <CreateAddressForm setIsOpen={setIsOpenCreateDialog} />
          </DialogContent>
        </Dialog>
      </div>
      {myAddresses.length > 0 && !getMyAddressesQuery.isLoading && (
        <div>
          {myAddresses.map((address) => (
            <div key={address._id} className='py-8 border-t first:border-t-0 flex space-x-10'>
              <div className='space-y-3 flex-1'>
                <div className='flex items-center space-x-3'>
                  <div className='font-medium'>{address.fullName}</div>
                  <Separator className='w-0.5 h-6' />
                  <div className='text-sm text-muted-foreground'>{address.phoneNumber}</div>
                </div>
                <div className='text-sm text-muted-foreground'>
                  {`${address.specificAddress}, ${address.ward.prefix} ${address.ward.name}, ${address.district.name}, ${address.province.name}`}
                </div>
                {address.isDefault && (
                  <Badge variant='outline' className='border-red-500 text-red-500'>
                    Mặc định
                  </Badge>
                )}
              </div>
              <div className='flex flex-col items-end space-y-2 basis-1/3'>
                <div className='flex items-center'>
                  <Button variant='link' className='px-2' onClick={() => handleStartUpdateAddress(address._id)}>
                    Cập nhật
                  </Button>
                  <Button variant='link' className='px-2' onClick={() => handleStartDeleteAddress(address._id)}>
                    Xóa
                  </Button>
                </div>
                <Button
                  variant='outline'
                  disabled={setDefaultAddressMutation.isPending}
                  onClick={() => handleSetDefaultAddress(address._id)}
                >
                  {setDefaultAddressMutation.isPending && <Loader2 size={16} className='animate-spin mr-3' />}
                  Thiết lập mặc định
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {getMyAddressesQuery.isLoading && (
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[250px]' />
          <Skeleton className='h-4 w-[200px]' />
        </div>
      )}
      <Alert className='border-yellow-500 bg-yellow-500/5 mt-10'>
        <AlertDescription className='text-yellow-500'>
          Nếu số điện thoại hoặc địa chỉ nhận hàng chưa chính xác. Vui lòng kiểm tra và cập nhật.
        </AlertDescription>
      </Alert>
      {/* Update address dialog */}
      <Dialog
        open={!!currentUpdatedAddressId}
        onOpenChange={(value) => {
          if (value) setCurrentUpdatedAddressId(currentUpdatedAddressId)
          else setCurrentUpdatedAddressId(null)
        }}
      >
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Cập nhật địa chỉ</DialogTitle>
          </DialogHeader>
          <CreateAddressForm setIsOpen={setIsOpenCreateDialog} addressId={currentUpdatedAddressId || undefined} />
        </DialogContent>
      </Dialog>
      {/* Deletion address dialog */}
      <AlertDialog
        open={!!currentDeletionAddressId}
        onOpenChange={(value: boolean) => {
          if (value) setCurrentDeletionAddressId(currentDeletionAddressId)
          else setCurrentDeletionAddressId(null)
        }}
      >
        <AlertDialogContent className='max-w-sm'>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc muốn xoá địa chỉ này?</AlertDialogTitle>
            <AlertDialogDescription>Địa chỉ sẽ không được khôi phục sau khi xóa.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteAddressMutation.mutate(currentDeletionAddressId as string)}>
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  )
}

export default isAuth(Addresses)
