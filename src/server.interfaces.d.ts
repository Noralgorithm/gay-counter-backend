import { Socket } from "socket.io"
import { Response } from "./gay-counter/domain/response.interface"

export interface ServerToClientEvents {
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
  updatedCounter: (res: Response) => void
  sendedPlayers: (res: Response) => void
  sendedHistory: (res: Response) => void
}

export interface ClientToServerEvents {
  hello: (arg: string) => void
  incrementCounter: (id: number, quantity: number) => void
  fetchPlayers: () => void
  fetchHistory: () => void
  createPlayer: (name: string, img: string) => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  name: string
  age: number
}
