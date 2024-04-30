import { UserRole, UserStatus, UserVerifyStatus } from '@/constants/enum'
import { SuccessResponse } from '@/types/utils.types'

export type LoggedUser = {
  _id: string
  email: string
  fullName: string
  avatar: string
  status: UserStatus
  role: UserRole
  verify: UserVerifyStatus
  createdAt: string
  updatedAt: string
}

export type LoginResponse = SuccessResponse<{
  accessToken: string
  refreshToken: string
  user: LoggedUser
}>
