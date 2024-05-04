/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { PenLine, Trash } from 'lucide-react'
import Link from 'next/link'
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
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import PATH from '@/constants/path'
import { Brand } from '@/types/products.types'

export const columns: ColumnDef<Brand>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title='Tên nhãn hiệu' />,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'nation',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Quốc gia' />,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Ngày tạo' />,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Cập nhật lúc' />,
    enableSorting: false,
    enableHiding: false
  },
  {
    id: 'actions',
    header: () => <div className='text-right'>Thao tác</div>,
    cell: ({ row }) => {
      const queryClient = useQueryClient()
      const brand = row.original

      const deleteBrandMutation = useMutation({
        mutationKey: ['delete-brand'],
        mutationFn: productsApis.deleteBrand,
        onSuccess: (data) => {
          const { message } = data.data
          toast.success(message)
          queryClient.invalidateQueries({ queryKey: ['get-all-brands'] })
        }
      })

      return (
        <div className='flex justify-end space-x-3'>
          <Button size='sm' asChild>
            <Link href={PATH.DASHBOARD_BRAND_UPDATE(brand._id)}>
              <PenLine size={16} className='mr-2' />
              Cập nhật
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size='sm' variant='destructive'>
                <Trash size={16} className='mr-2' />
                Xóa
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='max-w-sm'>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn có chắc muốn xóa nhãn hiệu này?</AlertDialogTitle>
                <AlertDialogDescription>
                  Nhãn hiệu này sẽ bị xóa vĩnh viễn và không thể khôi phục.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBrandMutation.mutate(brand._id)}>Xóa</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )
    }
  }
]
