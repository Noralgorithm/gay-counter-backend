export interface Player {
  id: number
  name: string
  score: number
  img: string
  updatedAt: string
}

export type CreatedPlayer = Pick<Player, 'name' | 'img'>