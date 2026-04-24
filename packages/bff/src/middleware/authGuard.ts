import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'rick-and-morty-secret'

export interface AuthRequest extends Request {
  user?: {
    username: string
  }
}

export const authGuard = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token requerido' })
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string }
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ message: 'Token inválido o expirado' })
  }
}