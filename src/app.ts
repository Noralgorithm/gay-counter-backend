import express, { Express, Application, Request, Response } from 'express'
import Server from './server'
import { synchronizeTables } from './gay-counter/repository/sql-repository/sync'

synchronizeTables()

const app = express()

export default app
