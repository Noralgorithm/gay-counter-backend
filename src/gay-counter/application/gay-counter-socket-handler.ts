import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { GayCounterSocketHandlerInterface } from "./gay-counter-socket-handler.interface"
import { Repository } from "../repository/repository.interface"
import { Server, Socket } from "socket.io"

class GayCounterSocketHandler implements GayCounterSocketHandlerInterface {

  private repository: Repository

  constructor(repository: Repository) {
    this.repository = repository
  }

  async onIncrementCounter(io: Server, id: number, quantity: number) {
    await this.repository.incrementCounter(id, quantity)
    console.log('Incremented counter by ', quantity, ' to player with ID: ', id)
    const newCount = await this.repository.getCount()
    io.emit('updatedCounter', newCount)
  }

  async onFetchPlayers(socket: Socket): Promise<void> {
    const response = await this.repository.getPlayers()
    console.log('Fetched Players')
    console.log(response)
    socket.emit('sendedPlayers', response)
  }

  async onFetchHistory(socket: Socket): Promise<void> {
    const response = await this.repository.getHistory()
    console.log('Fetched History')
    socket.emit('sendedHistory', response)
  }

  async onCreatePlayer(socket: Socket, name: string, img: string): Promise<void> {
    try {
      await this.repository.createPlayer(name, img)
      console.log('Created Player')
      socket.emit('CreatedPlayer', {success: true, message: 'Player created successfully!'})
    } catch(e) {
      console.log('Error creating player')
      socket.emit('CreatedPlayer', {success: false, message: 'Player creation failed!'})
    }
  }

  async onGetCounter(socket: Socket): Promise<void> {
    try {
      const response = await this.repository.getCount()
      console.log('Fetched count')
      socket.emit('fetchedCount', response)
    } catch(e) {
      socket.emit('fetchedCount', {success: false, message: 'Failed to fetch count!'})
    }
  }
}

export default GayCounterSocketHandler