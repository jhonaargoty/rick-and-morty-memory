import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'rick-and-morty-secret'

const VALID_USERS = [
  { username: 'rick', password: 'pickle123' },
  { username: 'morty', password: 'adventures123' }
]

router.post('/login', (req: Request, res: Response): void => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400).json({ message: 'Usuario y contraseña requeridos' })
    return
  }

  const user = VALID_USERS.find(
    u => u.username === username && u.password === password
  )

  if (!user) {
    res.status(401).json({ message: 'Credenciales inválidas' })
    return
  }

  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '2h' })

  res.json({ token, username: user.username })
})

export default router