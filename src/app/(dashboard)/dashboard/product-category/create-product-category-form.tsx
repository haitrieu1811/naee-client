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
import { CreateProductCategorySchema, createProductCategorySchema } from '@/rules/products.rules'
import { ProductCategory } from '@/types/products.types'

type CreateProductCategoryForm = {
  productCategoryId?: string
}

const CreateProductCategoryForm = ({ productCategoryId }: CreateProductCategoryForm) => {
  const router = useRouter()

  const form = useForm<CreateProductCategorySchema>({
    resolver: zodResolver(createProductCategorySchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  const getOneProductCategoryQuery = useQuery({
    queryKey: ['get-one-product-category', productCategoryId],
    queryFn: () => productsApis.getOneCategory(productCategoryId as string),
    enabled: !!productCategoryId
  })

  const productCategory = useMemo(
    () => getOneProductCategoryQuery.data?.data.data.category,
    [getOneProductCategoryQuery.data?.data.data.category]
  )

  const updateFormData = useCallback(
    (productCategory: ProductCategory) => {
      const { setValue } = form
      const { name, description } = productCategory
      setValue('name', name)
      setValue('description', description)
    },
    [form]
  )

  // Update form when have productCategory data (update mode)
  useEffect(() => {
    if (!productCategory) return
    updateFormData(productCategory)
  }, [updateFormData, productCategory])

  const createProductCategoryMutation = useMutation({
    mutationKey: ['create-product-category'],
    mutationFn: productsApis.createCategory,
    onSuccess: (data) => {
      toast.success(data.data.message)
      form.reset()
    }
  })

  const updateProductCategoryMutation = useMutation({
    mutationKey: ['update-product-category'],
    mutationFn: productsApis.updateCategory,
    onSuccess: (data) => {
      toast.success(data.data.message)
    }
  })

  const formIsPending = createProductCategoryMutation.isPending || updateProductCategoryMutation.isPending

  const handleSubmit = form.handleSubmit((data) => {
    if (!productCategoryId) {
      createProductCategoryMutation.mutate(data)
      return
    }
    updateProductCategoryMutation.mutate({ body: data, categoryId: productCategoryId })
  })

  const handleCancel = () => {
    if (!productCategoryId) {
      form.reset()
      return
    }
    if (!productCategory) return
    updateFormData(productCategory)
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
              {!productCategoryId ? 'Thêm danh mục sản phẩm mới' : 'Cập nhật danh mục sản phẩm'}
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
                <CardTitle>Thông tin danh mục sản phẩm</CardTitle>
                <CardDescription>Điền thông tin danh mục sản phẩm</CardDescription>
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

export default CreateProductCategoryForm
