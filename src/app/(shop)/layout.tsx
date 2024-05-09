import { Fragment, ReactNode } from 'react'

import Header from '@/app/(shop)/_components/header'
import Footer from '@/components/footer'

const ShopLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <Header />
      <div className='bg-muted'>
        <main className='max-w-7xl mx-auto'>{children}</main>
      </div>
      <Footer />
    </Fragment>
  )
}

export default ShopLayout
