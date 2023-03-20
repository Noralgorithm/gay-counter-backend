import { Socket, io } from 'socket.io-client'
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../server.interfaces'
import { ResponseInterface } from '../gay-counter/domain/response.interface'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:3002'
)

socket.on('connect', () => {
  console.log('Connected to server!')
})

socket.on('sendedPlayers', (res: ResponseInterface) => {
  console.log(res)
})

socket.on('sendedHistory', (res: ResponseInterface) => {
  console.log(res)
})

setTimeout(() => socket.emit('fetchHistory'), 500)
