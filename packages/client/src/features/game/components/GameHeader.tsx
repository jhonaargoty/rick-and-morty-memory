import styles from './GameHeader.module.css'

interface GameHeaderProps {
  attempts: number
  matchedPairs: number
  username: string
  onLogout: () => void
}

const GameHeader = ({ attempts, matchedPairs, username, onLogout }: GameHeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <h1 className={styles.title}>Rick & Morty</h1>
        <span className={styles.subtitle}>Memory Game</span>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Turnos</span>
          <span className={styles.statValue}>{attempts}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Aciertos</span>
          <span className={styles.statValue}>{matchedPairs}</span>
        </div>
      </div>

      <div className={styles.user}>
        <span className={styles.username}>{username}</span>
        <button className={styles.logoutBtn} onClick={onLogout}>
          Salir
        </button>
      </div>
    </header>
  )
}

export default GameHeader