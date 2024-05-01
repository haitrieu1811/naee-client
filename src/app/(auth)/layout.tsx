import { Fragment, ReactNode } from 'react'

import Header from '@/app/(auth)/_components/header'
import Footer from '@/components/footer'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <Header />
      <main className='max-w-7xl mx-auto pb-20'>{children}</main>
      <Footer />
    </Fragment>
  )
}

export default AuthLayout
