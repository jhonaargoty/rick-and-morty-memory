// Mock del hook useGameEngine
jest.mock('../hooks/useGameEngine', () => ({
  useGameEngine: () => ({
    flipCard: jest.fn(),
  }),
}))

// Mock del contexto
jest.mock('../../../context/GameContext', () => ({
  useGame: () => ({
    state: {
      cards: [],
      flippedCards: [],
      matchedPairs: 0,
      attempts: 0,
      isChecking: false,
      isGameOver: false,
      phase: 'idle',
    },
    dispatch: jest.fn(),
  }),
}))

import { render, screen } from '@testing-library/react'
import GameBoard from './GameBoard'

describe('GameBoard', () => {
  it('should show loading message when phase is idle', () => {
    render(<GameBoard attempts={0} matchedPairs={0} />)

    expect(screen.getByText('Cargando...')).toBeInTheDocument()
  })

  it('should show game board when phase is playing', () => {
    // Mock del contexto para simular estado playing
    const mockUseGame = jest.spyOn(require('../../../context/GameContext'), 'useGame')
    mockUseGame.mockReturnValue({
      state: {
        cards: [],
        flippedCards: [],
        matchedPairs: 2,
        attempts: 5,
        isChecking: false,
        isGameOver: false,
        phase: 'playing',
      },
      dispatch: jest.fn(),
    })

    render(<GameBoard attempts={5} matchedPairs={2} />)

    expect(screen.getByText('Turnos:')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('Aciertos:')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()

    mockUseGame.mockRestore()
  })
})