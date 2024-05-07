'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import isEmpty from 'lodash/isEmpty'
import { Loader2, PlusCircle, Upload, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import productsApis from '@/apis/products.apis'
import InputFile from '@/components/input-file'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ProductDiscountType, ProductStatus } from '@/constants/enum'
import PATH from '@/constants/path'
import useBrands from '@/hooks/useBrands'
import useProductCategories from '@/hooks/useProductCategories'
import useUploadImage from '@/hooks/useUploadImage'
import { isEntityError } from '@/lib/utils'
import { CreateProductSchema, createProductSchema } from '@/rules/products.rules'
import { CreateProductReqBody } from '@/types/products.types'
import { ErrorResponse } from '@/types/utils.types'

const DISCOUNT_TYPES = [
  {
    value: ProductDiscountType.Money.toString(),
    label: 'Giảm theo giá tiền'
  },
  {
    value: ProductDiscountType.Percent.toString(),
    label: 'Giảm theo phần trăm'
  }
] as const

const STATUSES = [
  {
    value: ProductStatus.Active.toString(),
    label: 'Hoạt động'
  },
  {
    value: ProductStatus.Inactive.toString(),
    label: 'Ngừng hoạt động'
  }
] as const

type CreateProductFormProps = {
  productId?: string
}

const CreateProductForm = ({ productId }: CreateProductFormProps) => {
  const { productCategories } = useProductCategories()
  const { brands } = useBrands()
  const { uploadImageMutation } = useUploadImage()

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [photoFiles, setPhotoFiles] = useState<File[]>([])
  const [photoIds, setPhotoIds] = useState<string[]>([])

  const thumbnailReview = useMemo(() => (thumbnailFile ? URL.createObjectURL(thumbnailFile) : null), [thumbnailFile])
  const photoReviews = useMemo(
    () => (photoFiles ? photoFiles.map((photoFile) => URL.createObjectURL(photoFile)) : []),
    [photoFiles]
  )

  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      availableCount: '',
      productCategoryId: '',
      brandId: '',
      discountType: ProductDiscountType.Money.toString(),
      discountValue: '0',
      status: ProductStatus.Active.toString()
    }
  })

  const getProductQuery = useQuery({
    queryKey: ['get-product', productId],
    queryFn: () => productsApis.getOneProduct(productId as string),
    enabled: !!productId
  })

  const product = useMemo(() => getProductQuery.data?.data.data.product, [getProductQuery.data?.data.data.product])

  // Update form when have product data (update mode)
  useMemo(() => {
    if (!product) return
    const { setValue } = form
    const { name, originalPrice, availableCount, description, category, brand, discountType, discountValue, status } =
      product
    setValue('name', name)
    setValue('price', originalPrice.toString())
    setValue('availableCount', availableCount.toString())
    setValue('description', description)
    setValue('productCategoryId', category._id)
    setValue('brandId', brand._id)
    setValue('discountType', discountType.toString())
    setValue('discountValue', discountValue.toString())
    setValue('status', status.toString())
    setPhotoIds(product.photos.map((photo) => photo._id))
  }, [product, form])

  const handleChangeThumbnail = (files: File[] | undefined) => {
    if (!files) return
    setThumbnailFile(files[0])
  }

  const handleChangePhotos = (files: File[] | undefined) => {
    if (!files) return
    setPhotoFiles((prevState) => [...prevState, ...files])
  }

  const handleDeletePhotoReview = (image: string) => {
    const indexFound = photoReviews.findIndex((photoReview) => photoReview === image)
    if (indexFound === -1) return
    setPhotoFiles((prevState) => prevState.filter((_, index) => index !== indexFound))
  }

  const handleDeletePhoto = (imageId: string) => {
    setPhotoIds((prevState) => prevState.filter((id) => id !== imageId))
  }

  const createProductMutation = useMutation({
    mutationKey: ['create-product'],
    mutationFn: productsApis.createProduct,
    onSuccess: (data) => {
      toast.success(data.data.message)
      form.reset()
      setThumbnailFile(null)
      setPhotoFiles([])
    },
    onError: (error) => {
      if (isEntityError<ErrorResponse<Record<keyof CreateProductSchema, string>>>(error)) {
        const errors = error.response?.data.errors
        if (!isEmpty(errors)) {
          Object.keys(errors).map((key) => {
            form.setError(key as keyof CreateProductSchema, {
              message: errors[key as keyof CreateProductSchema],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const updateProductMutation = useMutation({
    mutationKey: ['update-product'],
    mutationFn: productsApis.updateProduct,
    onSuccess: (data) => {
      toast.success(data.data.message)
      getProductQuery.refetch()
      setThumbnailFile(null)
      setPhotoFiles([])
    },
    onError: (error) => {
      if (isEntityError<ErrorResponse<Record<keyof CreateProductSchema, string>>>(error)) {
        const errors = error.response?.data.errors
        if (!isEmpty(errors)) {
          Object.keys(errors).map((key) => {
            form.setError(key as keyof CreateProductSchema, {
              message: errors[key as keyof CreateProductSchema],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const isPending = uploadImageMutation.isPending || createProductMutation.isPending || updateProductMutation.isPending
  console.log('>>> data', form.watch())

  const handleSubmit = form.handleSubmit(async (data) => {
    let thumbnail: string = product?.thumbnail._id || ''
    let photos: string[] = photoIds.map((photoId) => photoId) || []
    if (thumbnailFile) {
      const uploadThumbnailForm = new FormData()
      uploadThumbnailForm.append('image', thumbnailFile)
      const uploadThumbnailResponse = await uploadImageMutation.mutateAsync(uploadThumbnailForm)
      const thumbnailIdResponse = uploadThumbnailResponse.data.data.images[0]._id
      thumbnail = thumbnailIdResponse
    }
    if (photoFiles.length > 0) {
      const uploadPhotosForm = new FormData()
      photoFiles.forEach((photoFile) => {
        uploadPhotosForm.append('image', photoFile)
      })
      const uploadPhotosResponse = await uploadImageMutation.mutateAsync(uploadPhotosForm)
      const photoIdsResposne = uploadPhotosResponse.data.data.images.map((photo) => photo._id)
      photos = photos.concat(photoIdsResposne)
    }
    const { availableCount, discountType, price, discountValue, status } = data
    const body: CreateProductReqBody = {
      ...data,
      thumbnail,
      photos,
      availableCount: Number(availableCount),
      discountType: Number(discountType),
      price: Number(price),
      discountValue: Number(discountValue),
      status: Number(status)
    }
    if (!productId) {
      createProductMutation.mutate(body)
    } else {
      updateProductMutation.mutate({ body, productId })
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <div className='grid gap-4'>
          <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
            <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
              <Card>
                <CardHeader>
                  <CardTitle>Chi tiết sản phẩm</CardTitle>
                  <CardDescription>Thông tin chi tiết sản phẩm</CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên</FormLabel>
                        <FormControl>
                          <Input type='text' className='w-full' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Price */}
                  <FormField
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giá</FormLabel>
                        <FormControl>
                          <Input type='text' className='w-full' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Available count */}
                  <FormField
                    control={form.control}
                    name='availableCount'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số lượng có sẵn</FormLabel>
                        <FormControl>
                          <Input type='text' className='w-full' {...field} />
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
                          <Textarea rows={5} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Danh mục và nhãn hiệu</CardTitle>
                  <CardDescription>Danh mục và nhãn hiệu của sản phẩm</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-6 grid-cols-12'>
                    <div className='space-y-3 col-span-6'>
                      {/* Product category id */}
                      <FormField
                        control={form.control}
                        name='productCategoryId'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Danh mục sản phẩm</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Chọn danh mục sản phẩm' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {productCategories.map((productCategory) => (
                                  <SelectItem key={productCategory._id} value={productCategory._id}>
                                    {productCategory.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button size='sm' variant='ghost' className='gap-1' asChild>
                        <Link href={PATH.DASHBOARD_PRODUCT_CATEGORY_NEW}>
                          <PlusCircle className='h-3.5 w-3.5' />
                          Thêm danh mục mới
                        </Link>
                      </Button>
                    </div>
                    <div className='space-y-3 col-span-6'>
                      {/* Brand id */}
                      <FormField
                        control={form.control}
                        name='brandId'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nhãn hiệu</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Chọn nhãn hiệu' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {brands.map((brand) => (
                                  <SelectItem key={brand._id} value={brand._id}>
                                    {brand.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button size='sm' variant='ghost' className='gap-1' asChild>
                        <Link href={PATH.DASHBOARD_PRODUCT_BRAND_NEW}>
                          <PlusCircle className='h-3.5 w-3.5' />
                          Thêm nhãn hiệu mới
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Giảm giá</CardTitle>
                  <CardDescription>Giảm giá sản phẩm</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-6 grid-cols-12'>
                    <div className='space-y-3 col-span-6'>
                      {/* Discount type */}
                      <FormField
                        control={form.control}
                        name='discountType'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kiểu giảm giá</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Chọn kiểu giảm giá' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {DISCOUNT_TYPES.map((item) => (
                                  <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='space-y-3 col-span-6'>
                      {/* Discount value */}
                      <FormField
                        control={form.control}
                        name='discountValue'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Giá trị giảm giá (VNĐ/%)</FormLabel>
                            <FormControl>
                              <Input type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
              <Card>
                <CardHeader>
                  <CardTitle>Trạng thái sản phẩm</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-6'>
                    <FormField
                      control={form.control}
                      name='status'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trạng thái</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Chọn trạng thái sản phẩm' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {STATUSES.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card className='overflow-hidden'>
                <CardHeader>
                  <CardTitle>Hỉnh ảnh sản phẩm</CardTitle>
                  <CardDescription>Hình ảnh sản phẩm để người mua có thể xem được</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-2'>
                    {/* Thumbnail preview */}
                    {(thumbnailReview || product?.thumbnail) && (
                      <div className='relative'>
                        <Image
                          alt='Product image'
                          className='aspect-square w-full rounded-md object-cover'
                          height='300'
                          src={thumbnailReview || product?.thumbnail.url || ''}
                          width='300'
                        />
                        <div className='flex justify-end absolute inset-x-0 bottom-0 p-1 bg-black/50'>
                          <InputFile onChange={(files) => handleChangeThumbnail(files)}>
                            <Button type='button' size='sm' variant='secondary'>
                              Thay đổi
                            </Button>
                          </InputFile>
                        </div>
                      </div>
                    )}
                    {!thumbnailReview && !product?.thumbnail && (
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger>
                          <InputFile onChange={(files) => handleChangeThumbnail(files)}>
                            <div className='w-full h-[300px] border border-dashed rounded-md flex justify-center items-center'>
                              <Upload className='h-8 w-8 text-muted-foreground' />
                            </div>
                          </InputFile>
                        </TooltipTrigger>
                        <TooltipContent>Tải hình ảnh đại diện</TooltipContent>
                      </Tooltip>
                    )}
                    {form.formState.isSubmitted && !thumbnailFile && !product?.thumbnail.url && (
                      <p className='text-[0.8rem] font-medium text-destructive'>Ảnh đại diện sản phẩm là bắt buộc</p>
                    )}
                    <div className='grid grid-cols-3 gap-2'>
                      {/* Photos */}
                      {product?.photos
                        .filter((photo) => photoIds.includes(photo._id))
                        .map((photo) => (
                          <div key={photo._id} className='relative'>
                            <Image
                              alt='Product image'
                              src={photo.url}
                              height='84'
                              width='84'
                              className='aspect-square w-full rounded-md object-cover'
                            />
                            <Button
                              type='button'
                              size='icon'
                              variant='destructive'
                              className='absolute top-1 right-1 w-5 h-5 rounded-full'
                              onClick={() => handleDeletePhoto(photo._id)}
                            >
                              <X size={10} />
                            </Button>
                          </div>
                        ))}
                      {/* Photo reviews */}
                      {photoReviews.map((photoReview) => (
                        <div key={photoReview} className='relative'>
                          <Image
                            alt='Product image'
                            src={photoReview}
                            height='84'
                            width='84'
                            className='aspect-square w-full rounded-md object-cover'
                          />
                          <Button
                            type='button'
                            size='icon'
                            variant='destructive'
                            className='absolute top-1 right-1 w-5 h-5 rounded-full'
                            onClick={() => handleDeletePhotoReview(photoReview)}
                          >
                            <X size={10} />
                          </Button>
                        </div>
                      ))}
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger>
                          <InputFile multiple onChange={(files) => handleChangePhotos(files)}>
                            <button
                              type='button'
                              className='flex aspect-square w-full items-center justify-center rounded-md border border-dashed'
                            >
                              <Upload className='h-4 w-4 text-muted-foreground' />
                              <span className='sr-only'>Upload</span>
                            </button>
                          </InputFile>
                        </TooltipTrigger>
                        <TooltipContent>Tải hình ảnh chi tiết</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <Button type='button' variant='outline' size='sm'>
              Hủy bỏ
            </Button>
            <Button type='submit' size='sm' disabled={isPending}>
              {isPending && <Loader2 className='w-3 h-3 mr-2 animate-spin' />}
              Lưu lại
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default CreateProductForm
