import { createContext, useContext, useReducer } from 'react'
import type { ReactNode } from 'react'
import { getToken, getUsername, logout as logoutService } from '../services/authService'

interface AuthState {
  token: string | null
  username: string | null
  isAuthenticated: boolean
}

type AuthAction =
  | { type: 'LOGIN'; payload: { token: string; username: string } }
  | { type: 'LOGOUT' }

const initialState: AuthState = {
  token: getToken(),
  username: getUsername(),
  isAuthenticated: !!getToken()
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        token: action.payload.token,
        username: action.payload.username,
        isAuthenticated: true
      }
    case 'LOGOUT':
      return {
        token: null,
        username: null,
        isAuthenticated: false
      }
    default:
      return state
  }
}

interface AuthContextType {
  state: AuthState
  login: (token: string, username: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = (token: string, username: string) => {
    dispatch({ type: 'LOGIN', payload: { token, username } })
  }

  const logout = () => {
    logoutService()
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}