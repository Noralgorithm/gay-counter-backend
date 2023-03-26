import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { GayCounterSocketHandlerInterface } from "./gay-counter-socket-handler.interface"
import { Repository } from "../repository/repository.interface"
import { Server, Socket } from "socket.io"

class GayCounterSocketHandler implements GayCounterSocketHandlerInterface {

  private repository: Repository

  constructor(repository: Repository) {
    this.repository = repository
  }

  onIncrementCounter(io: Server, id: number, quantity: number) {
    const response = this.repository.incrementCounter(id, quantity)
    console.log('Incremented counter by ', quantity, ' to player with ID: ', id)
    io.emit('updatedCounter', response)
  }

  async onFetchPlayers(socket: Socket): Promise<void> {
    const response = await this.repository.getPlayers()
    console.log('Fetched Players')
    console.log(response)
    socket.emit('sendedPlayers', response)
  }

  onFetchHistory(socket: Socket): void {
    const response = this.repository.getHistory()
    console.log('Fetched History')
    socket.emit('sendedHistory', response)
  }

  onCreatePlayer(socket: Socket, name: string, img: string): void {
    try {
      this.repository.createPlayer(name, img)
      console.log('Created Player')
      socket.emit('Created player successfully!')
    } catch(e) {
      console.log('Error creating player')
      socket.emit('Error creating player')
    }
  }
}

export default GayCounterSocketHandler