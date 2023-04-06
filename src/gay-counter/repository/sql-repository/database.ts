import mysql from 'mysql2'
import { DBHOST, DBPASSWORD, DBNAME, DBUSER } from '../../../config'

console.log('asdasd')

const pool = mysql.createPool({
  database: DBNAME,
  host: DBHOST,
  user: DBUSER,
  password: DBPASSWORD
})

pool.getConnection((err, connection) => {
  if (err != null) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('DATABASE CONNECTION WAS CLOSED')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('DATABASE HAS TOO MANY CONNECTIONS')
    }
    if (err.code === 'ECONNREFUSED') {
      console.log('DATABASE CONNECTION WAS REFUSED')
    }
  }

  if (connection != null) {
    connection.release()
    console.log('Database connected')
  }
})

export const promisePool = pool.promise()
