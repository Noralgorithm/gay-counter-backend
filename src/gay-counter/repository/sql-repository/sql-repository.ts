import { CreatedPlayer } from '../../domain/player.interface'
import { Response } from '../../domain/response.interface'
import mockRepository from '../mock-repository/mock-repository'
import { Repository } from '../repository.interface'
import { promisePool } from './database'

export class SqlRepository implements Repository {
  async incrementCounter(
    playerId: number,
    quantity: number
  ): Promise<Response> {
    if (typeof playerId !== 'number' || typeof quantity !== 'number')
      return {
        success: false,
        message: 'Invalid parameter type in the increment counter',
      }
    try {
      const newEntry = { playerId, quantity }
      const [result] = await promisePool.query(
        'INSERT INTO history SET ?',
        newEntry
      )
      return result
    } catch (e) {
      return { success: false, message: 'Error incrementing counter' }
    }
  }

  async getPlayers(): Promise<Response> {
    try {
      const [result] = await promisePool(
        'SELECT name, score, img, updatedAt FROM players'
      )
      return {
        success: true,
        message: 'Players fetched successfully',
        items: result,
      }
    } catch (e) {
      return { success: false, message: 'Error fetching players' }
    }
  }

  async getHistory(): Promise<Response> {
    try {
      const [result] = await promisePool(
        'SELECT name, score, img, updatedAt FROM players'
      )
      return {
        success: true,
        message: 'History fetched successfully',
        items: result,
      }
    } catch (e) {
      return { success: false, message: 'Error fetching history' }
    }
  }

  async createPlayer(name: string, img: string): Promise<Response> {
    if (typeof name !== 'string' || typeof img !== 'string')
      return { success: false, message: 'Invalid inputs' }

    const newPlayer: CreatedPlayer = { name: name, img: img }

    try {
      const [result] = await promisePool.query(
        'INSERT INTO players SET ?',
        newPlayer
      )
      console.log(result)
    } catch (e: any) {
      console.log(e.message)
    }

    return { success: true, message: 'Players added successfully' }
  }

  async getCount(): Promise<Response> {
    try {
      const [result] = await promisePool.query('SELECT SUM(score) FROM players')
      return {
        success: true,
        message: 'Count fetched successfully',
        item: Number(result[0]['SUM(score)']),
      }
    } catch (e) {
      return { success: false, message: 'Error getting count' }
    }
  }
}
