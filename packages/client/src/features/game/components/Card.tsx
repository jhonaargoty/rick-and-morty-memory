import type { CardType } from '../../../context/GameContext'
import styles from './Card.module.css'

interface CardProps {
  card: CardType
  onClick: () => void
  disabled: boolean
}

const Card = ({ card, onClick, disabled }: CardProps) => {
  const isFlipped = card.isFlipped || card.isMatched

  return (
    <div
      className={`${styles.cardWrapper} ${isFlipped ? styles.flipped : ''} ${card.isMatched ? styles.matched : ''}`}
      onClick={!disabled && !card.isMatched ? onClick : undefined}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <img
            src={card.character.image}
            alt={card.character.name}
            className={styles.image}
          />
          <p className={styles.name}>{card.character.name}</p>
        </div>
        <div className={styles.cardBack}>
          <span className={styles.backIcon}>?</span>
        </div>
      </div>
    </div>
  )
}

export default Card