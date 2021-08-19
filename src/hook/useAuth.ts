import { useContext } from 'react'
import { AuthContext } from '../providers/auth/authProvider'

export function useAuth() {
  const value = useContext(AuthContext)
  return value
}
