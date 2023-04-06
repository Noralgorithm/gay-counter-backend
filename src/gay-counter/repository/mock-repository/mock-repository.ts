import { history } from './mock-data/history'
import { players } from './mock-data/players'
import { Repository } from '../repository.interface'
import { Response } from '../../domain/response.interface'
import { Player } from '../../domain/player.interface'

class mockRepository implements Repository {
  incrementCounter(id: number, quantity: number): Promise<Response> {
    let counter = 0

    for (let i = 0; i < players.length; i++) {
      counter += players[i].score
    }

    return new Promise((resolve, reject) =>
      resolve({ success: true, message: 'Updated Counter', item: { counter } })
    )
  }
  getPlayers(): Promise<Response> {
    return new Promise((resolve, reject) =>
      resolve({ success: true, message: 'Fetched Player List', items: players })
    )
  }
  getHistory(): Promise<Response> {
    return new Promise((resolve, reject) =>
      resolve({ success: true, message: 'Fetched History', items: history })
    )
  }
  createPlayer(name: string, img: string): Promise<Response> {
    return new Promise((resolve, reject) =>
      resolve({ success: true, message: 'xd', items: history })
    )
  }
  getCount(): Promise<Response> {
    return new Promise((resolve, reject) =>
      resolve({ success: true, message: 'xd' })
    )
  }
  getRanking(): Promise<Response> {
    return new Promise((resolve, reject) =>
      resolve({ success: true, message: 'xd' })
    )
  }
}

export default mockRepository
