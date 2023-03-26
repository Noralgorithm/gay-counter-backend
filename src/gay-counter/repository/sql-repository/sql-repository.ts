import { CreatedPlayer } from '../../domain/player.interface'
import { Response } from '../../domain/response.interface'
import mockRepository from '../mock-repository/mock-repository'
import { Repository } from '../repository.interface'
import { promisePool } from './database'

export class SqlRepository implements Repository {
  incrementCounter(id: number, quantity: number): Promise<Response> {
    return new Promise((resolve, reject) => {})
  }

  async getPlayers(): Promise<Response> {
    try {
      const [r] = await promisePool('SELECT name, score, img, updatedAt FROM players')
      return r
    } catch (e) {
      return { success: false, message: 'Error fetching players'}
    }
  }

  getHistory(): Promise<Response> {
    return new Promise((resolve, reject) => {})
  }

  async createPlayer(name: string, img: string): Promise<Response> {
    if (typeof name !== 'string' || typeof img !== 'string')
      return { success: false, message: 'Invalid inputs' }

    const newPlayer: CreatedPlayer = { name: name, img: img }

    try {
      const [result] = await promisePool.query('INSERT INTO players SET ?', newPlayer)
      console.log(result) 
    } catch(e: any) {
      console.log(e.message)
    }

    return { success: true, message: 'Players added successfully'}
  }
}
