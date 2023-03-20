import Server from './server'
import app from './app'
import GayCounterSocketHandler from './gay-counter/gay-counter-socket-handler'
import mockRepository from './gay-counter/repository/mock-repository.interface'

const gayCounterSocketHandler = new GayCounterSocketHandler(new mockRepository())
const server = new Server(app, gayCounterSocketHandler)

server.init()
server.start(3002)
