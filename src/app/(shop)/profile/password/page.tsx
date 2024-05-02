import { Metadata } from 'next'

import Password from '@/app/(shop)/profile/password/password'

export const metadata: Metadata = {
  title: 'NAEE | Đổi mật khẩu',
  description: 'NAEE | Đổi mật khẩu'
}

const PasswordPage = () => {
  return <Password />
}

export default PasswordPage
