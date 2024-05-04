'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import productsApis from '@/apis/products.apis'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CreateBrandSchema, createBrandSchema } from '@/rules/products.rules'
import { Brand } from '@/types/products.types'

type CreateBrandFormProps = {
  brandId?: string
}

const CreateBrandForm = ({ brandId }: CreateBrandFormProps) => {
  const router = useRouter()

  const form = useForm<CreateBrandSchema>({
    resolver: zodResolver(createBrandSchema),
    defaultValues: {
      name: '',
      nation: '',
      description: ''
    }
  })

  const getBrandQuery = useQuery({
    queryKey: ['get-brand', brandId],
    queryFn: () => productsApis.getBrand(brandId as string),
    enabled: !!brandId
  })

  const brand = useMemo(() => getBrandQuery.data?.data.data.brand, [getBrandQuery.data?.data.data.brand])

  const updateFormData = useCallback(
    (brand: Brand) => {
      const { setValue } = form
      const { name, nation, description } = brand
      setValue('name', name)
      setValue('nation', nation)
      setValue('description', description)
    },
    [form]
  )

  // Update form when have brand data (update mode)
  useEffect(() => {
    if (!brand) return
    updateFormData(brand)
  }, [updateFormData, brand])

  const createBrandMutation = useMutation({
    mutationKey: ['create-brand'],
    mutationFn: productsApis.createBrand,
    onSuccess: (data) => {
      toast.success(data.data.message)
      form.reset()
    }
  })

  const updateBrandMutation = useMutation({
    mutationKey: ['update-brand'],
    mutationFn: productsApis.updateBrand,
    onSuccess: (data) => {
      toast.success(data.data.message)
    }
  })

  const formIsPending = createBrandMutation.isPending || updateBrandMutation.isPending

  const handleSubmit = form.handleSubmit((data) => {
    if (!brandId) {
      createBrandMutation.mutate(data)
      return
    }
    updateBrandMutation.mutate({ body: data, brandId })
  })

  const handleCancel = () => {
    if (!brandId) {
      form.reset()
      return
    }
    if (!brand) return
    updateFormData(brand)
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <div className='mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
          <div className='flex items-center gap-4'>
            <Button type='button' variant='outline' size='icon' className='h-7 w-7' onClick={() => router.back()}>
              <ChevronLeft className='h-4 w-4' />
              <span className='sr-only'>Back</span>
            </Button>
            <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
              {!brandId ? 'Thêm nhãn hiệu mới' : 'Cập nhật nhãn hiệu'}
            </h1>
            <div className='hidden items-center gap-2 md:ml-auto md:flex'>
              <Button type='button' variant='outline' size='sm' onClick={handleCancel}>
                Hủy bỏ
              </Button>
              <Button type='submit' size='sm' disabled={formIsPending}>
                {formIsPending && <Loader2 size={14} className='animate-spin mr-2' />}
                Lưu lại
              </Button>
            </div>
          </div>
          <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
            <Card>
              <CardHeader>
                <CardTitle>Thông tin nhãn hiệu</CardTitle>
                <CardDescription>Điền thông tin nhãn hiệu</CardDescription>
              </CardHeader>
              <CardContent className='space-y-8'>
                {/* Name */}
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Nation */}
                <FormField
                  control={form.control}
                  name='nation'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quốc gia</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Description */}
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Textarea rows={10} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default CreateBrandForm
