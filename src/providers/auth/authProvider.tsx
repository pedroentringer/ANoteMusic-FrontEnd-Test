import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useToast } from '@chakra-ui/react'

import Amplify, { Auth } from 'aws-amplify'

Amplify.configure({
  Auth: {
    region: 'eu-central-1',
    userPoolId: 'eu-central-1_p8DDGNY7k',
    userPoolWebClientId: 'b5mse79hn12pg6mr1cfcc5ili'
  }
})

export const DEFAULT_STORAGE_USER = process.env.NEXT_PUBLIC_STORAGE_USER || '@ANoteMusic:user'

export const AuthContext = createContext({} as ContextProvider)

interface IUser {
  name: string
  familyName: string
  fullName: string
  email: string
  accessToken: string
  refreshToken: string
}

export interface ContextProvider {
  user: IUser | undefined
  loginAuth: (data: LoginProps) => Promise<void>
  logoutAuth: () => void
}

interface AuthProviderProps {
  children?: ReactNode
}

interface LoginProps {
  email: string
  password: string
  redirectRouter?: string
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser>()
  const router = useRouter()

  const toast = useToast()

  useEffect(() => {
    getStorage()
  }, [])

  async function loginAuth({ email, password, redirectRouter }: LoginProps) {
    try {
      const userCognito = await Auth.signIn({
        username: email,
        password: password
      })

      const { attributes, signInUserSession } = userCognito
      const { accessToken, refreshToken } = signInUserSession

      const user: IUser = {
        name: attributes.name,
        familyName: attributes.family_name,
        fullName: `${attributes.name} ${attributes.family_name}`,
        email: attributes.email,
        accessToken: accessToken.jwtToken,
        refreshToken: refreshToken.token
      }

      setStorage(user)

      if (redirectRouter) {
        router.push(`/${redirectRouter}`)
      }

      console.log(user)
    } catch (error) {
      console.log('error signing up:', error)

      toast({
        title: 'Log In Error',
        description: error.message,
        status: 'error',
        position: 'top-right',
        isClosable: true
      })
    }
  }

  function logoutAuth() {
    router.push('/')
    localStorage.setItem(DEFAULT_STORAGE_USER, '')
    setUser(undefined)
  }

  function setStorage(data: IUser) {
    localStorage.setItem(DEFAULT_STORAGE_USER, JSON.stringify(data))
    setUser(data)
  }

  function getStorage() {
    const userCookie = localStorage.getItem(DEFAULT_STORAGE_USER)

    if (!userCookie) {
      return router.push('/')
    }
    const userData = JSON.parse(userCookie) as IUser

    setUser(userData)
  }

  return (
    <AuthContext.Provider value={{ user, loginAuth, logoutAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
