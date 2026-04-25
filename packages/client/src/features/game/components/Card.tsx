import type { CardType } from '../../../context/GameContext'
import cardBack from '../../../assets/card_back.png'
import styles from './Card.module.css'

interface CardProps {
  card: CardType
  onClick: () => void
  disabled: boolean
  index: number
}

const Card = ({ card, onClick, disabled, index }: CardProps) => {
  const isFlipped = card.isFlipped || card.isMatched

  return (
    <div
      className={`${styles.cardWrapper} ${isFlipped ? styles.flipped : ''} ${card.isMatched ? styles.matched : ''}`}
      onClick={!disabled && !card.isMatched ? onClick : undefined}
    >
      <div className={styles.cardInner} style={{ transitionDelay: `${index * 0.05}s` }}>
        <div className={styles.cardFront}>
          <img
            src={card.character.image}
            alt={card.character.name}
            className={styles.image}
          />
          <p className={styles.name}>{card.character.name}</p>
          
          <div className={styles.info}>
            {card.character.status !== "unknown" && (
              <span className={styles.species}>{card.character.status} - </span>
            )}
            {
              card.character.species !== "unknown" && (
               <span className={styles.species}>{card.character.species}</span>
              )
            }

            
          </div>
          
        </div>
        <div className={styles.cardBack}>
          <img src={cardBack} alt="card back" className={styles.backImage} />
        </div>
      </div>
    </div>
  )
}

export default Card