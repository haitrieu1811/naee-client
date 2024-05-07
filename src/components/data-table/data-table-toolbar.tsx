'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { priorities, statuses } from './data'
import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchField?: string
}

export function DataTableToolbar<TData>({ table, searchField = 'title' }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Tìm kiếm...'
          value={(table.getColumn(searchField)?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn(searchField)?.setFilterValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('status') && (
          <DataTableFacetedFilter column={table.getColumn('status')} title='Status' options={statuses} />
        )}
        {table.getColumn('priority') && (
          <DataTableFacetedFilter column={table.getColumn('priority')} title='Priority' options={priorities} />
        )}
        {isFiltered && (
          <Button variant='ghost' onClick={() => table.resetColumnFilters()} className='h-8 px-2 lg:px-3'>
            Đặt lại
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
    </div>
  )
}
