import { fetchCharacters } from './rickAndMortyApi'

// Mock de fetch global
const mockFetch = jest.fn()
;(global as any).fetch = mockFetch

describe('rickAndMortyApi', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchCharacters', () => {
    it('should fetch and return characters', async () => {
      const mockResponse = [
        { id: 1, name: 'Rick Sanchez', image: 'rick.jpg', species: 'Human', status: 'Alive' },
        { id: 2, name: 'Morty Smith', image: 'morty.jpg', species: 'Human', status: 'Alive' },
      ]

      mockFetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      } as any)

      const characters = await fetchCharacters()

      expect(mockFetch).toHaveBeenCalled()
      expect(characters).toHaveLength(2)
      expect(characters[0]).toEqual({
        id: 1,
        name: 'Rick Sanchez',
        image: 'rick.jpg',
        species: 'Human',
        status: 'Alive',
      })
    })

    it('should handle single character response', async () => {
      const mockResponse = { id: 1, name: 'Rick Sanchez', image: 'rick.jpg', species: 'Human', status: 'Alive' }

      mockFetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      } as any)

      const characters = await fetchCharacters()

      expect(characters).toHaveLength(1)
      expect(characters[0].name).toBe('Rick Sanchez')
    })

    it('should throw error on fetch failure', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'))

      await expect(fetchCharacters()).rejects.toThrow('Network error')
    })
  })
})