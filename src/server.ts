import express, { Express, Application } from 'express'
import { Server as SocketServer } from 'socket.io'
import http from 'http'
import {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from './server.interfaces.d'
import GayCounterSocketHandler from './gay-counter/gay-counter-socket-handler'
import { GayCounterSocketHandlerInterface } from './gay-counter/gay-counter-socket-handler.interface'

class Server {
  private server: http.Server
  private io: SocketServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
  private gayCounterSocketHandler: GayCounterSocketHandlerInterface

  constructor(
    app: Application,
    gayCounterSocketHandler: GayCounterSocketHandlerInterface
  ) {
    this.server = http.createServer(app)
    this.io = new SocketServer(this.server)
    this.gayCounterSocketHandler = gayCounterSocketHandler
  }

  init() {
    this.io.on('connection', socket => {
      console.log(`New client connected: ${socket.id}`)

      socket.on('hello', arg => {
        console.log(arg) // world
      })

      socket.on('incrementCounter', (id: number, quantity: number) => {
        this.gayCounterSocketHandler.onIncrementCounter(this.io, id, quantity)
      })

      socket.on('fetchPlayers', () => {
        this.gayCounterSocketHandler.onFetchPlayers(socket)
      })

      socket.on('fetchHistory', () => {
        this.gayCounterSocketHandler.onFetchHistory(socket)
      })

      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`)
      })
    })
  }

  start(port: number) {
    this.server.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`)
    })
  }
}

export default Server
