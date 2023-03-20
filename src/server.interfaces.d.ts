import { Socket } from "socket.io"
import { ResponseInterface } from "./gay-counter/domain/response.interface"

export interface ServerToClientEvents {
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
  updatedCounter: (res: ResponseInterface) => void
  sendedPlayers: (res: ResponseInterface) => void
  sendedHistory: (res: ResponseInterface) => void
}

export interface ClientToServerEvents {
  hello: (arg: string) => void
  incrementCounter: (id: number, quantity: number) => void
  fetchPlayers: () => void
  fetchHistory: () => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  name: string
  age: number
}
