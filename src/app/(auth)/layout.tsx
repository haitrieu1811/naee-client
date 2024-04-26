import { Fragment, ReactNode } from 'react'
import Header from '@/app/(auth)/_components/header'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <Header />
      <main className='max-w-7xl mx-auto'>{children}</main>
    </Fragment>
  )
}

export default AuthLayout
