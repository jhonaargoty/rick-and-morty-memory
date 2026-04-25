import { createContext, useContext, useReducer } from 'react'
import type { ReactNode } from 'react'
import type { Character } from '../services/rickAndMortyApi'

export interface CardType {
  uuid: string
  character: Character
  isFlipped: boolean
  isMatched: boolean
}

interface GameState {
  cards: CardType[]
  flippedCards: CardType[]
  matchedPairs: number
  attempts: number
  isChecking: boolean
  isGameOver: boolean
  phase: 'idle' | 'preview' | 'playing' | 'finished'
}

type GameAction =
  | { type: 'SET_CARDS'; payload: CardType[] }
  | { type: 'SET_PHASE'; payload: GameState['phase'] }
  | { type: 'FLIP_CARD'; payload: string }
  | { type: 'SET_CHECKING'; payload: boolean }
  | { type: 'MATCH_CARDS' }
  | { type: 'UNMATCH_CARDS' }
  | { type: 'INCREMENT_ATTEMPTS' }
  | { type: 'RESET' }

const initialState: GameState = {
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  attempts: 0,
  isChecking: false,
  isGameOver: false,
  phase: 'idle'
}

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_CARDS':
      return { ...state, cards: action.payload }

    case 'SET_PHASE':
      return { ...state, phase: action.payload }

    case 'FLIP_CARD': {
      const updatedCards = state.cards.map(card =>
        card.uuid === action.payload ? { ...card, isFlipped: true } : card
      )
      const flippedCards = updatedCards.filter(c => c.isFlipped && !c.isMatched)
      return { ...state, cards: updatedCards, flippedCards }
    }

    case 'SET_CHECKING':
      return { ...state, isChecking: action.payload }

    case 'MATCH_CARDS': {
      const matchedIds = state.flippedCards.map(c => c.uuid)
      const updatedCards = state.cards.map(card =>
        matchedIds.includes(card.uuid) ? { ...card, isMatched: true } : card
      )
      const matchedPairs = state.matchedPairs + 1
      const isGameOver = matchedPairs === updatedCards.length / 2
      return {
        ...state,
        cards: updatedCards,
        flippedCards: [],
        matchedPairs,
        isChecking: false,
        isGameOver,
        phase: isGameOver ? 'finished' : state.phase
      }
    }

    case 'UNMATCH_CARDS': {
      const flippedIds = state.flippedCards.map(c => c.uuid)
      const updatedCards = state.cards.map(card =>
        flippedIds.includes(card.uuid) ? { ...card, isFlipped: false } : card
      )
      return {
        ...state,
        cards: updatedCards,
        flippedCards: [],
        isChecking: false
      }
    }

    case 'INCREMENT_ATTEMPTS':
      return { ...state, attempts: state.attempts + 1 }

    case 'RESET':
      return initialState

    default:
      return state
  }
}

interface GameContextType {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = (): GameContextType => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}