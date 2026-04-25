import styles from './GameHeader.module.css'
import header from '../../../assets/header.png'
import logoutIcon from '../../../assets/off.png'

interface GameHeaderProps {
  username: string
  onLogout: () => void
}


const GameHeader = ({ username, onLogout }: GameHeaderProps) => {
  return (
    <header className={styles.header}>
      <img src={header} alt="Rick and Morty" />
      <div className={styles.user}>
        <img src={logoutIcon} alt="Logout" className={styles.logoutIcon} onClick={onLogout} />
        <span className={styles.username}>{username}</span>
      </div>
    </header>
  )
}

export default GameHeader