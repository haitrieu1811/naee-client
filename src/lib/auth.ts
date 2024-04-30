'use client'

import { LoggedUser } from '@/types/users.types'

export const setAccessTokenToLS = (accessToken: string) => {
  if (typeof window === 'undefined') return
  return localStorage.setItem('accessToken', accessToken)
}

export const getAccessTokenFromLS = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('accessToken')
}

export const removeAccessTokenFromLS = () => {
  if (typeof window === 'undefined') return
  return localStorage.removeItem('accessToken')
}

export const setRefreshTokenToLS = (refreshToken: string) => {
  if (typeof window === 'undefined') return
  return localStorage.setItem('refreshToken', refreshToken)
}

export const getRefreshTokenFromLS = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('refreshToken')
}

export const removeRefreshTokenFromLS = () => {
  if (typeof window === 'undefined') return
  return localStorage.removeItem('refreshToken')
}

export const setProfileToLS = (profile: LoggedUser) => {
  if (typeof window === 'undefined') return
  return localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfileFromLS = (): LoggedUser | null => {
  if (typeof window === 'undefined') return null
  const profile = localStorage.getItem('profile')
  if (profile) return JSON.parse(profile)
  return null
}

export const removeProfileFromLS = () => {
  if (typeof window === 'undefined') return
  return localStorage.removeItem('profile')
}

export const resetAuthLS = () => {
  removeAccessTokenFromLS()
  removeRefreshTokenFromLS()
  removeProfileFromLS()
}
