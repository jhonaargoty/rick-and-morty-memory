const BASE_URL = '/api/auth'

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  token: string
  username: string
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al iniciar sesión')
  }

  return response.json()
}

export const saveToken = (token: string, username: string): void => {
  localStorage.setItem('token', token)
  localStorage.setItem('username', username)
}

export const getToken = (): string | null => {
  return localStorage.getItem('token')
}

export const getUsername = (): string | null => {
  return localStorage.getItem('username')
}

export const logout = (): void => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
}

export const isAuthenticated = (): boolean => {
  return !!getToken()
}