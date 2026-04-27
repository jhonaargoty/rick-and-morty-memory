import { useGame } from '../../../context/GameContext'
import { fetchCharacters } from '../../../services/rickAndMortyApi'
import type { Character } from '../../../services/rickAndMortyApi'
import type { CardType } from '../../../context/GameContext'

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const buildCards = (characters: Character[]): CardType[] => {
  const pairs = characters.flatMap(character => [
    { uuid: `${character.id}-a`, character, isFlipped: false, isMatched: false },
    { uuid: `${character.id}-b`, character, isFlipped: false, isMatched: false }
  ])
  return shuffleArray(pairs)
}

export const useGameEngine = () => {
  const { state, dispatch } = useGame()

  const initGame = async () => {
    dispatch({ type: 'RESET' })
    dispatch({ type: 'SET_PHASE', payload: 'preview' })

    try {
      const characters = await fetchCharacters()
      const cards = buildCards(characters)

      const flippedCards = cards.map(c => ({ ...c, isFlipped: true }))
      dispatch({ type: 'SET_CARDS', payload: flippedCards })

      setTimeout(() => {
        const hiddenCards = cards.map(c => ({ ...c, isFlipped: false }))
        dispatch({ type: 'SET_CARDS', payload: hiddenCards })
        dispatch({ type: 'SET_PHASE', payload: 'playing' })
      }, 3000)

    } catch (error) {
      console.error('Error iniciando juego:', error)
    }
  }

  const flipCard = (uuid: string) => {
    if (state.isChecking) return
    if (state.flippedCards.length >= 2) return
    if (state.flippedCards.find(c => c.uuid === uuid)) return
    if (state.cards.find(c => c.uuid === uuid)?.isMatched) return

    dispatch({ type: 'FLIP_CARD', payload: uuid })

    const currentFlipped = state.flippedCards
    if (currentFlipped.length === 1) {
      dispatch({ type: 'INCREMENT_ATTEMPTS' })
      dispatch({ type: 'SET_CHECKING', payload: true })

      const firstCard = currentFlipped[0]
      const secondCardCharacterId = uuid.split('-')[0]
      const firstCardCharacterId = firstCard.uuid.split('-')[0]

      setTimeout(() => {
        if (firstCardCharacterId === secondCardCharacterId) {
          dispatch({ type: 'MATCH_CARDS' })
        } else {
          dispatch({ type: 'UNMATCH_CARDS' })
        }
      }, 1000)
    }
  }

  return { initGame, flipCard }
}