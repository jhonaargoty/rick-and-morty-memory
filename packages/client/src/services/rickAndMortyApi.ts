const BASE_URL = 'https://rickandmortyapi.com/api'

export interface Character {
  id: number
  name: string
  image: string
  species: string
  status: string
}

const getRandomIds = (count: number): number[] => {
  const ids = new Set<number>()
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * 826) + 1)
  }
  return Array.from(ids)
}

export const fetchCharacters = async (): Promise<Character[]> => {
  const ids = getRandomIds(8)
  const response = await fetch(`${BASE_URL}/character/${ids.join(',')}`)

  if (!response.ok) {
    throw new Error('Error al obtener personajes')
  }

  const data = await response.json()
  const characters: Character[] = Array.isArray(data) ? data : [data]

  return characters.map(c => ({
    id: c.id,
    name: c.name,
    image: c.image,
    species: c.species,
    status: c.status
  }))
}