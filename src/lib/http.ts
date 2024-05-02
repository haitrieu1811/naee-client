import axios, { AxiosInstance, HttpStatusCode, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'sonner'

import { LOGIN_URL, LOGOUT_URL, REFRESH_TOKEN_URL, UPDATE_ME_URL } from '@/apis/users.apis'
import {
  getAccessTokenFromLS,
  getProfileFromLS,
  getRefreshTokenFromLS,
  resetAuthLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from '@/lib/auth'
import { isExpiredError, isUnauthorizedError } from '@/lib/utils'
import { LoggedUser, LoginResponse } from '@/types/users.types'
import { AuthResponse, ErrorResponse } from '@/types/utils.types'

class Http {
  instance: AxiosInstance
  private accessToken: string | null
  private refreshToken: string | null
  private profile: LoggedUser | null
  private refreshTokenRequest: Promise<string> | null

  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.profile = getProfileFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url, method } = response.config
        if (url && method && [LOGIN_URL, UPDATE_ME_URL].includes(url) && ['patch', 'post'].includes(method)) {
          const { accessToken, refreshToken, user } = (response.data as LoginResponse).data
          this.accessToken = accessToken
          this.refreshToken = refreshToken
          this.profile = user
          setAccessTokenToLS(accessToken)
          setRefreshTokenToLS(refreshToken)
          setProfileToLS(user)
        }
        if (url === LOGOUT_URL) {
          this.accessToken = null
          this.refreshToken = null
          this.profile = null
          resetAuthLS()
        }
        return response
      },
      async (error) => {
        if (![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status)) {
          const data: any | undefined = error.response.data
          const message = data?.message || error.message
          toast.error(message)
        }
        // Lỗi 401 (Sai, thiếu hoặc hết hạn access token)
        if (isUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
          const { url } = config
          // Khi access token hết hạn và không phải request từ refresh access token
          if (isExpiredError(error) && url !== REFRESH_TOKEN_URL) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest?.then((accessToken) => {
              config.headers.Authorization = accessToken
              // Tiếp tục request cũ nếu bị lỗi
              return this.instance({
                ...config,
                headers: { ...config.headers, Authorization: accessToken }
              })
            })
          }
          resetAuthLS()
          this.accessToken = null
          this.refreshToken = null
          this.profile = null
          const errorMessage = error.response?.data.errors?.message || error.response?.data.message
          if (errorMessage) {
            toast.error(errorMessage)
          }
        }

        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken = async () => {
    return this.instance
      .post<AuthResponse>(REFRESH_TOKEN_URL, { refreshToken: this.refreshToken })
      .then((res) => {
        const { accessToken, refreshToken } = res.data.data
        setAccessTokenToLS(accessToken)
        setRefreshTokenToLS(refreshToken)
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        return accessToken
      })
      .catch((error) => {
        resetAuthLS()
        this.accessToken = null
        this.refreshToken = null
        throw error
      })
  }
}

const http = new Http().instance
export default http
