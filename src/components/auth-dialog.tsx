'use client'

import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

import { Dialog, DialogContent } from '@/components/ui/dialog'

const AuthDialog = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent className='p-0 border-none max-w-md'>{children}</DialogContent>
    </Dialog>
  )
}

export default AuthDialog
