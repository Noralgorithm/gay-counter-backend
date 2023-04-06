import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT
export const DOMAIN = process.env.DOMAIN
export const DBNAME = process.env.DBNAME
export const DBHOST = process.env.HOST
export const DBUSER = process.env.DBUSER
export const DBPASSWORD = process.env.DBPASSWORD
export const APITOKEN = process.env.APITOKEN