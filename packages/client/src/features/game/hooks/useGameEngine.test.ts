import { renderHook } from '@testing-library/react'
import { useGameEngine } from './useGameEngine'

// Mock del servicio de API
jest.mock('../../../services/rickAndMortyApi', () => ({
  fetchCharacters: jest.fn(),
}))

import { fetchCharacters } from '../../../services/rickAndMortyApi'

const mockFetchCharacters = fetchCharacters as jest.MockedFunction<typeof fetchCharacters>

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
  GameProvider: ({ children }: { children: any }) => children,
}))

describe('useGameEngine', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('initGame', () => {
    it('should call fetchCharacters when initGame is called', async () => {
      const mockCharacters = [
        { id: 1, name: 'Rick', image: 'rick.jpg', species: 'Human', status: 'Alive' },
        { id: 2, name: 'Morty', image: 'morty.jpg', species: 'Human', status: 'Alive' },
      ]
      mockFetchCharacters.mockResolvedValue(mockCharacters)

      const { result } = renderHook(() => useGameEngine())

      await result.current.initGame()

      expect(mockFetchCharacters).toHaveBeenCalledTimes(1)
    })

    it('should handle fetch error gracefully', async () => {
      mockFetchCharacters.mockRejectedValue(new Error('API Error'))

      const { result } = renderHook(() => useGameEngine())

      // initGame maneja el error internamente, no rechaza la promesa
      await expect(result.current.initGame()).resolves.toBeUndefined()
    })
  })

  describe('flipCard', () => {
    it('should be defined', () => {
      const { result } = renderHook(() => useGameEngine())

      expect(result.current.flipCard).toBeDefined()
      expect(typeof result.current.flipCard).toBe('function')
    })
  })
})