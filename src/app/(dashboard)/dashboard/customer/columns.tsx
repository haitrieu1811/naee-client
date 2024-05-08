import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { convertMomentToVietnamese } from '@/lib/utils'
import { Customer } from '@/types/users.types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const columns: ColumnDef<Customer>[] = [
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
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => (
      <div className='flex items-center space-x-2'>
        <Avatar>
          <AvatarImage src={row.original.avatar} alt={row.original.email} />
          <AvatarFallback>{row.original.email[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <span>{row.original.email}</span>
      </div>
    ),
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
    header: () => <div className='text-right'> Thao tác</div>,
    cell: () => (
      <div className='flex justify-end'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'>
              <DotsHorizontalIcon className='h-4 w-4' />
              <span className='sr-only'>Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>Thông tin tài khoản</DropdownMenuItem>
            <DropdownMenuItem>Khóa tài khoản</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }
]
