import { useGame } from '../../../context/GameContext'
import { useGameEngine } from '../hooks/useGameEngine'
import Card from './Card.tsx'
import styles from './GameBoard.module.css'

interface GameBoardProps {
  attempts: number
  matchedPairs: number
}

const GameBoard = ({ attempts, matchedPairs }: GameBoardProps) => {
  const { state } = useGame()
  const { flipCard } = useGameEngine()

  if (state.phase === 'idle') {
    return (
      <div className={styles.loading}>
        <p>Cargando personajes...</p>
      </div>
    )
  }

  return (
    <div className={styles.board}>

      <div className={styles.headerBoard}>
      
        <div className={styles.stat}>
          <span className={styles.statLabel}>Turnos: </span>
          <div className={styles.statValue}>{attempts}</div>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Aciertos: </span>
          <div className={styles.statValue}>{matchedPairs}</div>
        </div>
    
      </div>

    <div className={styles.boardContent}>
      {state.cards.map((card, index) => (
        <Card
          key={card.uuid}
          card={card}
          onClick={() => flipCard(card.uuid)}
          disabled={state.phase === 'preview' || state.isChecking}
          index={index}
        />
      ))}
      </div>
    </div>
  )
}

export default GameBoard