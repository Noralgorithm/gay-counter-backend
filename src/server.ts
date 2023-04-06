import express, { Express, Application, NextFunction } from 'express'
import { Server as SocketServer } from 'socket.io'
import http from 'http'
import {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from './server.interfaces.d'
import GayCounterSocketHandler from './gay-counter/application/gay-counter-socket-handler'
import { GayCounterSocketHandlerInterface } from './gay-counter/application/gay-counter-socket-handler.interface'
import { APITOKEN } from './config'

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
      this.io.use((socket, next) => {
        const token = socket.handshake.auth.token
        if (token !== APITOKEN) next(new Error('Authentication failed'))
        next()
      })

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

      socket.on('fetchRanking', () => {
        this.gayCounterSocketHandler.onFetchRanking(socket)
      })

      socket.on('fetchHistory', () => {
        this.gayCounterSocketHandler.onFetchHistory(socket)
      })

      socket.on('createPlayer', (name: string, img: string) => {
        this.gayCounterSocketHandler.onCreatePlayer(socket, name, img)
      })

      socket.on('getCounter', () => {
        this.gayCounterSocketHandler.onGetCounter(socket)
      })

      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`)
      })
    })
  }

  start(port: string) {
    this.server.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`)
    })
  }
}

export default Server
