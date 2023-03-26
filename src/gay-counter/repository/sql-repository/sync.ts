import { promisePool } from './database'
import fs from 'fs'

const TABLE_NOT_FOUND = 1146
const TRIGGER_NOT_FOUND = 1360

const TABLES = [
  'players',
  'history',
]
const TRIGGERS = [
  'history_ai'
]

export const synchronizeTables = async (): Promise<void> => {
  for (const element of TABLES) {
    await verifyTable(element)
  }
  for (const element of TRIGGERS) {
    await verifyTrigger(element)
  }
}

const verifyTable = async (element: string): Promise<void> => {
  try {
    await promisePool.query(`DESCRIBE ${element}`)
    console.log(`🟢 Tabla [${element}] existe`)
  } catch (error: any) {
    if (error.errno === TABLE_NOT_FOUND) {
      console.log(`🟠 No existe la tabla [${element}]`)
      await createTable(element)
      return
    }
    console.log(`Error del servidor al intentar validar la tabla [${element}]`)
  }
}

const verifyTrigger = async (element: string): Promise<void> => {
  try {
    await promisePool.query(`SHOW CREATE TRIGGER ${element}`)
    console.log(`🟢 Trigger [${element}] existe`)
  } catch (error: any) {
    if (error.errno === TRIGGER_NOT_FOUND) {
      console.log(`🟠 No existe el trigger [${element}]`)
      await createTrigger(element)
      return
    }
    console.log(`Error del servidor al intentar validar la tabla [${element}]`)
  }
}

const createTable = async (element: string): Promise<void> => {
  try {
    const tableQuery = fs.readFileSync(`./src/gay-counter/repository/sql-repository/tables/${element}.sql`, 'utf-8')
    await promisePool.query(tableQuery)
    console.log(`🔵 Tabla [${element}] creada exitosamente`)
  } catch (error: any) {
    console.log(`Error del servidor al intentar crear la tabla [${element}]`)
    throw error
  }
}

const createTrigger = async (element: string): Promise<void> => {
  try {
    const triggerQuery = fs.readFileSync(`./src/gay-counter/repository/sql-repository/triggers/${element}.sql`, 'utf-8')
    await promisePool.query(triggerQuery)
    console.log(`🔵 Trigger [${element}] creado exitosamente`)
  } catch (error: any) {
    console.log(`Error del servidor al intentar crear la tabla [${element}]`)
    throw error
  }
}