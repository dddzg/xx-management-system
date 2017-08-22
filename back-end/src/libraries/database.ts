import 'reflect-metadata'
import * as config from 'config'
import * as path from 'path'
import { createConnection, Connection } from 'typeorm'

const dbConfig = config.database

const root = path.resolve(__dirname, '..')
const entityPath = `${root}/entities/*.{js,ts}`

export const database: () => Promise<Connection> = async () => createConnection({
  type: 'mysql',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.name,
  entities: [entityPath],
  autoSchemaSync: !!+dbConfig.sync
}).then(c => {
  console.log('[DB] Database Connected')
  return c
})
