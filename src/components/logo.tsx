import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

import PATH from '@/constants/path'

const Logo = () => {
  return (
    <Link href={PATH.HOME} className='flex items-center space-x-4'>
      <ShoppingBag size={30} />
      <span className='font-bold tracking-tight text-2xl'>E Commerce</span>
    </Link>
  )
}

export default Logo
