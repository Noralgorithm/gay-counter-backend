import { Player } from "./player.interface"
import { HistoryEntry } from "./history-entry.interface"

export interface Response {
  success: boolean
  message: string
  item?: {
    counter: number
  } | Number
  items?: Array<Player | HistoryEntry>
}