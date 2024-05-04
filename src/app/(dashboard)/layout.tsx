import DashboardHeader from '@/app/(dashboard)/_components/header'
import DashboardSidebar from '@/app/(dashboard)/_components/sidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <DashboardSidebar />
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
        <DashboardHeader />
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
