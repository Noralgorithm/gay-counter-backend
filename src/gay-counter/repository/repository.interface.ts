import { Response } from "../domain/response.interface"

export interface Repository {
  incrementCounter(id: number, quantity: number): Promise<Response>
  getPlayers(): Promise<Response>
  getHistory(): Promise<Response>
  createPlayer(name: string, img: string): Promise<Response>
}