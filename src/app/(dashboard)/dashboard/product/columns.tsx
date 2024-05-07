/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { Ellipsis } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { toast } from 'sonner'

import productsApis from '@/apis/products.apis'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
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
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ProductStatus } from '@/constants/enum'
import PATH from '@/constants/path'
import { convertMomentToVietnamese, formatCurrency } from '@/lib/utils'
import { Product } from '@/types/products.types'

export const columns: ColumnDef<Product>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Sản phẩm' />,
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className='flex items-center space-x-3'>
          <Image
            width={200}
            height={200}
            src={product.thumbnail}
            alt={product.name}
            className='w-[50px] h-[50px] rounded-lg object-cover'
          />
          <p>{product.name}</p>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Trạng thái' />,
    cell: ({ row }) => {
      const status = row.original.status
      const statuses = {
        [ProductStatus.Active]: 'Hoạt động',
        [ProductStatus.Inactive]: 'Ngừng hoạt động'
      }
      return <Badge variant='outline'>{statuses[status]}</Badge>
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'originalPrice',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Giá gốc' />,
    cell: ({ row }) => `đ ${formatCurrency(row.original.originalPrice)}`,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'availableCount',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Sản phẩm có sẵn' />,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Tạo lúc' />,
    cell: ({ row }) => convertMomentToVietnamese(moment(row.original.createdAt).fromNow()),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Cập nhật lúc' />,
    cell: ({ row }) => convertMomentToVietnamese(moment(row.original.updatedAt).fromNow()),
    enableSorting: false,
    enableHiding: false
  },
  {
    id: 'actions',
    header: () => <div className='text-right'>Thao tác</div>,
    cell: ({ row }) => {
      const queryClient = useQueryClient()
      const product = row.original
      const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false)

      const deleteProductMutation = useMutation({
        mutationKey: ['delete-product'],
        mutationFn: productsApis.deleteProduct,
        onSuccess: (data) => {
          toast.success(data.data.message)
          queryClient.invalidateQueries({ queryKey: ['get-all-products'] })
        }
      })

      return (
        <Fragment>
          <div className='flex justify-end'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Ellipsis size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem asChild>
                  <Link href={PATH.DASHBOARD_PRODUCT_UPDATE(product._id)}>Cập nhật</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsOpenDeleteDialog(true)}>Xóa</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <AlertDialog open={isOpenDeleteDialog} onOpenChange={(value) => setIsOpenDeleteDialog(value)}>
            <AlertDialogContent className='max-w-sm'>
              <AlertDialogHeader>
                <AlertDialogTitle>Xóa sản phẩm</AlertDialogTitle>
                <AlertDialogDescription>
                  Bạn có chắc muốn xóa sản phẩm này? Lưu ý: Sau khi xóa, bạn không thể hoàn tác hay khôi phục sản phẩm.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteProductMutation.mutate(product._id)}>Xóa</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Fragment>
      )
    }
  }
]
