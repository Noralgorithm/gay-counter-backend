import { Socket } from "socket.io"
import { Server } from "socket.io"

export interface GayCounterSocketHandlerInterface {
  onIncrementCounter(io: Server, id: number, quantity: number): void
  onFetchPlayers(socket: Socket): void
  onFetchRanking(socket: Socket): void
  onFetchHistory(socket: Socket): void
  onCreatePlayer(socket: Socket, name: string, img: string): void
  onGetCounter(socket: Socket): void
}