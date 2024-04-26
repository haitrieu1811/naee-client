import { ReactNode, Fragment } from 'react'
import Header from '@/app/(shop)/_components/header'

const ShopLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <Header />
      <main className='max-w-7xl mx-auto'>{children}</main>
    </Fragment>
  )
}

export default ShopLayout
