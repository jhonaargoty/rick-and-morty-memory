import { useGame } from '../../../context/GameContext'
import { useGameEngine } from '../hooks/useGameEngine'
import Card from './Card.tsx'
import RmLoading from '../../../assets/r_m_loading.gif'
import styles from './GameBoard.module.css'

interface GameBoardProps {
  attempts: number
  matchedPairs: number
}

const GameBoard = ({ attempts, matchedPairs }: GameBoardProps) => {
  const { state } = useGame()
  const { flipCard } = useGameEngine()

  console.log('GameBoard render', { state, attempts, matchedPairs })
  console.log('GameBoard render', state.phase)

  if (state.phase === 'idle') {
    return (
      <div className={styles.board}>
        <div className={styles.loading}>
          <img src={RmLoading} alt="Cargando..." className={styles.loadingImage} />
          <p>Cargando...</p>
        </div>
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