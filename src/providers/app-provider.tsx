'use client'

import { Dispatch, ReactNodeArray, SetStateAction, createContext, useState } from 'react'

import { getAccessTokenFromLS, getProfileFromLS } from '@/lib/auth'
import { LoggedUser } from '@/types/users.types'

type AppContext = {
  isAuthenticated: boolean
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
  profile: LoggedUser | null
  setProfile: Dispatch<SetStateAction<LoggedUser | null>>
}

const initialContext: AppContext = {
  isAuthenticated: !!getAccessTokenFromLS(),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null
}

export const AppContext = createContext<AppContext>(initialContext)

const AppProvider = ({ children }: { children: ReactNodeArray }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialContext.isAuthenticated)
  const [profile, setProfile] = useState(initialContext.profile)

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
