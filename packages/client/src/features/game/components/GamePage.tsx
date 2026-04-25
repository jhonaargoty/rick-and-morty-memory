import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../../../context/GameContext'
import { useAuth } from '../../../context/AuthContext'
import { useGameEngine } from '../hooks/useGameEngine'
import GameBoard from './GameBoard'
import GameHeader from './GameHeader'
import GameOver from './GameOver'
import styles from './GamePage.module.css'

const GamePage = () => {
  const { state } = useGame()
  const { state: authState, logout } = useAuth()
  const { initGame } = useGameEngine()
  const navigate = useNavigate()

  useEffect(() => {
    if (authState.token) {
      initGame(authState.token)
    }
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className={styles.container}>
      <GameHeader
        username={authState.username || ''}
        onLogout={handleLogout}
      />

      {state.phase === 'finished' ? (
        <GameOver
          attempts={state.attempts}
          onRepeat={() => authState.token && initGame(authState.token)}
          onHome={() => navigate('/login')}
        />
      ) : (
        <GameBoard 
          attempts={state.attempts}
          matchedPairs={state.matchedPairs}
        />
      )}
    </div>
  )
}

export default GamePage