import Server from './server'
import app from './app'
import GayCounterSocketHandler from './gay-counter/application/gay-counter-socket-handler'
import mockRepository from './gay-counter/repository/mock-repository/mock-repository'
import { PORT } from './config'
import { SqlRepository } from './gay-counter/repository/sql-repository/sql-repository'

const gayCounterSocketHandler = new GayCounterSocketHandler(new SqlRepository)
const server = new Server(app, gayCounterSocketHandler)

server.init()
server.start(PORT !== undefined ? PORT : '3002')
