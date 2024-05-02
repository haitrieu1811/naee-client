import Addresses from '@/app/(shop)/profile/addresses/addresses'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NAEE | Địa chỉ nhận hàng',
  description: 'NAEE | Địa chỉ nhận hàng'
}

const AddressesPage = () => {
  return <Addresses />
}

export default AddressesPage
