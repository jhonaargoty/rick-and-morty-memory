import { useGame } from '../../../context/GameContext'
import { useGameEngine } from '../hooks/useGameEngine'
import Card from './Card.tsx'
import styles from './GameBoard.module.css'

const GameBoard = () => {
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
      {state.cards.map(card => (
        <Card
          key={card.uuid}
          card={card}
          onClick={() => flipCard(card.uuid)}
          disabled={state.phase === 'preview' || state.isChecking}
        />
      ))}
    </div>
  )
}

export default GameBoard