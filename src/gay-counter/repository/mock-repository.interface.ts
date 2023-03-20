import { history } from "./mock-repository/mock-data/history"
import { players } from "./mock-repository/mock-data/players"
import { Repository } from "./repository.interface"
import { ResponseInterface } from "../domain/response.interface"
import { Player } from "../domain/player.interface"

class mockRepository implements Repository {
  incrementCounter(id: number, quantity: number): ResponseInterface {
    let counter = 0

    for (let i = 0; i < players.length; i++) {
      counter += players[i].score
    }

    return { success: true, message: 'Updated Counter', item: { counter } }
  }
  getPlayers(): ResponseInterface {
    return { success: true, message: 'Fetched Player List', items: players }
  }
  getHistory(): ResponseInterface {
    return { success: true, message: 'Fetched History', items: history }
  }
}

export default mockRepository
