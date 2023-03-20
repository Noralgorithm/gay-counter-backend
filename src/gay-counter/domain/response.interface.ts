import { Player } from "./player.interface"
import { HistoryEntry } from "./history-entry.interface"

export interface ResponseInterface {
  success: boolean
  message: string
  item?: {
    counter: number
  }
  items?: Array<Player | HistoryEntry>
}