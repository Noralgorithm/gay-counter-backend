import { Socket } from "socket.io"
import { Response } from "./gay-counter/domain/response.interface"

export interface ServerToClientEvents {
  updatedCounter: (res: Response) => void
  sendedPlayers: (res: Response) => void
  sendedRanking: (res: Response) => void
  sendedHistory: (res: Response) => void
  sendedCount: (res: Response) => void
}

export interface ClientToServerEvents {
  hello: (arg: string) => void
  incrementCounter: (id: number, quantity: number) => void
  fetchPlayers: () => void
  fetchRanking: () => void
  fetchHistory: () => void
  createPlayer: (name: string, img: string) => void
  getCounter: () => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  name: string
  age: number
}
