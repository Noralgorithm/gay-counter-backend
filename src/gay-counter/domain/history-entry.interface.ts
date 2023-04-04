export interface HistoryEntry {
  id: number
  quantity: number
  playerId: number
  createdAt: string
}

export type CreatedHistory = Pick<HistoryEntry, 'playerId' | 'quantity'>