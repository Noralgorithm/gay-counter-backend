import { Socket, io } from 'socket.io-client'
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../server.interfaces'
import { Response } from '../gay-counter/domain/response.interface'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:3002'
)

socket.on('connect', () => {
  console.log('Connected to server!')
})

socket.on('sendedPlayers', (res: Response) => {
  console.log(res)
})

socket.on('sendedHistory', (res: Response) => {
  console.log(res)
})

setTimeout(() => {
  socket.emit('createPlayer', 'Rosas', 'www.xvideos.com')
  socket.emit('createPlayer', 'Mamen', 'www.google.com')
  socket.emit('createPlayer', 'Nora', 'www.google.com')
  socket.emit('createPlayer', 'Waldo', 'www.google.com')
  socket.emit('createPlayer', 'Hector', 'www.google.com')
  socket.emit('createPlayer', 'Velma', 'www.google.com')
  socket.emit('createPlayer', 'Paniagua', 'www.google.com')
}, 100)