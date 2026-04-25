import styles from './GameOver.module.css'

interface GameOverProps {
  attempts: number
  onRepeat: () => void
  onHome: () => void
}

const GameOver = ({ attempts, onRepeat, onHome }: GameOverProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>🎉</div>
        <h2 className={styles.title}>¡Completado!</h2>
        <p className={styles.message}>
          Encontraste todos los pares en
        </p>
        <div className={styles.attempts}>
          <span className={styles.attemptsNumber}>{attempts}</span>
          <span className={styles.attemptsLabel}>turnos</span>
        </div>

        <div className={styles.buttons}>
          <button className={styles.repeatBtn} onClick={onRepeat}>
            Repetir
          </button>
          <button className={styles.homeBtn} onClick={onHome}>
            Inicio
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameOver