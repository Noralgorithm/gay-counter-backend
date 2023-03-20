import { ResponseInterface } from "../domain/response.interface"

export interface Repository {
  incrementCounter(id: number, quantity: number): ResponseInterface
  getPlayers(): ResponseInterface
  getHistory(): ResponseInterface
}