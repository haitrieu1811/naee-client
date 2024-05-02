import { getRefreshTokenFromLS } from '@/lib/auth'
import http from '@/lib/http'
import { GetMeResponse, LoginResponse, UpdateMeResponse } from '@/types/users.types'
import { AuthResponse, OnlyMessageResponse } from '@/types/utils.types'

export const LOGIN_URL = '/users/login'
export const LOGOUT_URL = '/users/logout'
export const REFRESH_TOKEN_URL = '/users/refresh-token'
export const UPDATE_ME_URL = '/users/me'

const usersApis = {
  register(body: { email: string; password: string; confirmPassword: string }) {
    return http.post<AuthResponse>('/users/register', body)
  },

  login(body: { email: string; password: string }) {
    return http.post<LoginResponse>(LOGIN_URL, body)
  },

  logout() {
    const refreshToken = getRefreshTokenFromLS()
    return http.post<OnlyMessageResponse>(LOGOUT_URL, { refreshToken })
  },

  getMe() {
    return http.get<GetMeResponse>('/users/me')
  },

  updateMe(body: { fullName?: string; phoneNumber?: string; avatar?: string }) {
    return http.patch<UpdateMeResponse>(UPDATE_ME_URL, body)
  },

  resendEmailVerify() {
    return http.post<OnlyMessageResponse>('/users/resend-email-verify')
  },

  verifyEmail(body: { verifyEmailToken: string }) {
    return http.post<LoginResponse>('/users/verify-email', body)
  },

  changePassword(body: { oldPassword: string; password: string; confirmPassword: string }) {
    return http.patch<OnlyMessageResponse>('/users/change-password', body)
  }
} as const

export default usersApis
