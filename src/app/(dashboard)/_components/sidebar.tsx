'use client'

import clsx from 'clsx'
import { Home, Layers3, LineChart, Package, Package2, Settings, ShoppingCart, Users2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import PATH from '@/constants/path'

export const DASHBOARD_LINKS = [
  {
    href: PATH.DASHBOARD,
    icon: Home,
    tooltip: 'Dashboard'
  },
  {
    href: PATH.DASHBOARD_ORDER,
    icon: ShoppingCart,
    tooltip: 'Đơn hàng'
  },
  {
    href: PATH.DASHBOARD_PRODUCT,
    icon: Package,
    tooltip: 'Sản phẩm'
  },
  {
    href: PATH.DASHBOARD_PRODUCT_CATEGORY,
    icon: Layers3,
    tooltip: 'Danh mục sản phẩm'
  },
  {
    href: PATH.DASHBOARD_CUSTOMER,
    icon: Users2,
    tooltip: 'Khách hàng'
  },
  {
    href: PATH.DASHBOARD_ANALYTICS,
    icon: LineChart,
    tooltip: 'Thống kê'
  }
] as const

const DashboardSidebar = () => {
  const pathname = usePathname()

  return (
    <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
      <nav className='flex flex-col items-center gap-4 px-2 sm:py-4'>
        <Link
          href={PATH.HOME}
          className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
        >
          <Package2 className='h-4 w-4 transition-all group-hover:scale-110' />
          <span className='sr-only'>Acme Inc</span>
        </Link>
        {DASHBOARD_LINKS.map((item) => {
          const isActive = item.href === pathname
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={clsx({
                    'flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8':
                      true,
                    'text-muted-foreground': !isActive,
                    'bg-accent text-accent-foreground': isActive
                  })}
                >
                  <item.icon className='h-5 w-5' />
                  <span className='sr-only'>{item.tooltip}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right'>{item.tooltip}</TooltipContent>
            </Tooltip>
          )
        })}
      </nav>
      <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-4'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='#'
              className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
            >
              <Settings className='h-5 w-5' />
              <span className='sr-only'>Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  )
}

export default DashboardSidebar
