import express, { Express, Application, Request, Response } from 'express'
import Server from './server'
import { synchronizeTables } from './gay-counter/repository/sql-repository/sync'
import cors from 'cors'

synchronizeTables()

const app = express()

app.get('/', async (req, res) => { 
  return res.send('<h1>Hello, world!<!h1>')
})

export default app
