export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'

export interface Character {
  id: string
  name: string
  status: CharacterStatus
  species: string
  type: string
  gender: string
  image: string
  origin?: {
    id?: string
    name?: string
    type?: string
    dimension?: string
  }
  location?: {
    id?: string
    name?: string
    type?: string
    dimension?: string
  }
  episode?: Array<{
    id: string
    name: string
    air_date: string
    episode: string
  }>
  created?: string
}

export interface CharactersResponse {
  characters: {
    info: {
      count: number
      pages: number
      next: number
      prev: number
    }
    results: Character[]
  }
}
