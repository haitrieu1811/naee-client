'use client'

import { redirect } from 'next/navigation'
import { useContext, useEffect } from 'react'

import PATH from '@/constants/path'
import useIsClient from '@/hooks/useIsClient'
import { AppContext } from '@/providers/app-provider'

const isNotAuth = (Component: any) => {
  return function IsNotAuth(props: any) {
    const { isAuthenticated } = useContext(AppContext)
    const isClient = useIsClient()

    useEffect(() => {
      if (isAuthenticated && isClient) {
        return redirect(PATH.HOME)
      }
    }, [isAuthenticated, isClient])

    if (isAuthenticated && isClient) {
      return null
    }

    return <Component {...props} />
  }
}

export default isNotAuth
