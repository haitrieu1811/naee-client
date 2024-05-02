import { ReactNode } from 'react'

import ProfileSidebar from '@/app/(shop)/profile/sidebar'

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex items-start space-x-16 py-8'>
      <div className='sticky top-[168px]'>
        <ProfileSidebar />
      </div>
      <main className='flex-1 border rounded-sm px-10 py-5'>{children}</main>
    </div>
  )
}

export default ProfileLayout
