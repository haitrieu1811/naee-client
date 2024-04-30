import { getRefreshTokenFromLS } from '@/lib/auth'
import http from '@/lib/http'
import { LoginResponse } from '@/types/users.types'
import { AuthResponse, OnlyMessageResponse } from '@/types/utils.types'

export const LOGIN_URL = '/users/login'
export const LOGOUT_URL = '/users/logout'
export const REFRESH_TOKEN_URL = '/users/refresh-token'

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
  }
}

export default usersApis
