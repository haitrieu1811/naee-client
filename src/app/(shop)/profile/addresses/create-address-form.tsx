'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import addressesApis from '@/apis/addresses.apis'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { AddressType } from '@/constants/enum'
import { CreateAddressSchema, createAddressSchema } from '@/rules/address.rules'

type CreateAddressFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  addressId?: string
}

const CreateAddressForm = ({ setIsOpen, addressId }: CreateAddressFormProps) => {
  const queryClient = useQueryClient()

  const getAddressQuery = useQuery({
    queryKey: ['get-address', addressId],
    queryFn: () => addressesApis.getOne(addressId as string),
    enabled: !!addressId
  })

  const address = useMemo(() => getAddressQuery.data?.data.data.address, [getAddressQuery.data?.data.data.address])

  const form = useForm<CreateAddressSchema>({
    resolver: zodResolver(createAddressSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      provinceId: '',
      districtId: '',
      wardId: '',
      specificAddress: '',
      type: AddressType.Home.toString()
    }
  })

  // Update form when available address
  useEffect(() => {
    if (!address) return
    const { setValue } = form
    const { fullName, phoneNumber, province, district, ward, specificAddress, type } = address
    setValue('fullName', fullName)
    setValue('phoneNumber', phoneNumber)
    setValue('provinceId', province._id)
    setValue('districtId', district.id)
    setValue('wardId', ward.id)
    setValue('specificAddress', specificAddress)
    setValue('type', type.toString())
  }, [address, form])

  const provinceId = form.watch('provinceId')
  const districtId = form.watch('districtId')

  // Update wardId and districtId to '' when change provinceId
  useEffect(() => {
    form.setValue('districtId', '')
    form.setValue('wardId', '')
  }, [provinceId, form])

  // Update wardId to '' when change districtId
  useEffect(() => {
    form.setValue('wardId', '')
  }, [districtId, form])

  const getAllProvincesQuery = useQuery({
    queryKey: ['get-all-provinces'],
    queryFn: () => addressesApis.getAllProvinces()
  })

  const getDistrictsQuery = useQuery({
    queryKey: ['get-districts', provinceId],
    queryFn: () => addressesApis.getDistricts(provinceId),
    enabled: !!provinceId
  })

  const getWardsQuery = useQuery({
    queryKey: ['get-wards', provinceId, districtId],
    queryFn: () => addressesApis.getWards({ provinceId: provinceId as string, districtId: districtId as string }),
    enabled: !!provinceId && !!districtId
  })

  const provinces = useMemo(
    () => getAllProvincesQuery.data?.data.data.provinces || [],
    [getAllProvincesQuery.data?.data.data.provinces]
  )

  const districts = useMemo(
    () => getDistrictsQuery.data?.data.data.districts || [],
    [getDistrictsQuery.data?.data.data.districts]
  )

  const wards = useMemo(() => getWardsQuery.data?.data.data.wards || [], [getWardsQuery.data?.data.data.wards])

  const createAddressMutation = useMutation({
    mutationKey: ['create-address'],
    mutationFn: addressesApis.create,
    onSuccess: () => {
      setIsOpen(false)
      queryClient.invalidateQueries({ queryKey: ['get-my-addresses'] })
      toast.success('Thêm địa chỉ thành công')
    }
  })

  const onSubmit = form.handleSubmit((data) => {
    if (!addressId) {
      createAddressMutation.mutate({
        ...data,
        type: Number(data.type)
      })
      return
    }
  })

  return (
    <Form {...form}>
      <form className='space-y-8' onSubmit={onSubmit}>
        <div className='flex space-x-4'>
          <div className='flex-auto'>
            <FormField
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex-auto'>
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
          </div>
        </div>
        <div className='flex space-x-4'>
          <div className='flex-auto'>
            <FormField
              control={form.control}
              name='provinceId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tỉnh/Thành phố</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Tỉnh/Thành phố' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province._id} value={province._id}>
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex-auto'>
            <FormField
              control={form.control}
              name='districtId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quận/Huyện</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Quận/Huyện' />
                      </SelectTrigger>
                    </FormControl>
                    {districts.length > 0 && (
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district.id} value={district.id}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    )}
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex-auto'>
            <FormField
              control={form.control}
              name='wardId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phường/Xã</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Phường/Xã' />
                      </SelectTrigger>
                    </FormControl>
                    {wards.length > 0 && (
                      <SelectContent>
                        {wards.map((ward) => (
                          <SelectItem key={ward.id} value={ward.id}>
                            {`${ward.prefix} ${ward.name}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    )}
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name='specificAddress'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ cụ thể</FormLabel>
              <FormControl>
                <Textarea className='resize-none' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Loại địa chỉ</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                  className='flex flex-col space-y-1'
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={AddressType.Home.toString()} />
                    </FormControl>
                    <FormLabel className='font-normal'>Nhà riêng</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={AddressType.Office.toString()} />
                    </FormControl>
                    <FormLabel className='font-normal'>Văn phòng</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <div className='flex justify-end space-x-3'>
          <Button type='button' variant='outline' onClick={() => setIsOpen(false)}>
            Trờ lại
          </Button>
          <Button type='submit' disabled={createAddressMutation.isPending}>
            {createAddressMutation.isPending && <Loader2 size={16} className='mr-2 animate-spin' />}
            Hoàn thành
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateAddressForm
