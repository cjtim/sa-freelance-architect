import { createConnection, getConnection } from 'typeorm'
import {
  Architect,
  Contract,
  Customer,
  DeliverTask,
  FileList,
  Furniture,
  ProjectFurniture,
  Project,
  Receipt,
} from '../entity'
import CONFIG from '../config'

const entities = [
  Architect,
  Contract,
  Customer,
  DeliverTask,
  FileList,
  Furniture,
  ProjectFurniture,
  Project,
  Receipt,
]

export async function connectDB() {
  try {
    const connection = getConnection()
    if (!connection.isConnected) {
      throw Error('No connection')
    }
  } catch (e) {
    const {
      PSQL_HOSTNAME,
      PSQL_PASSWORD,
      PSQL_USERNAME,
      PSQL_DATABASE,
    } = CONFIG
    await createConnection({
      type: 'postgres',
      host: PSQL_HOSTNAME,
      port: 5432,
      username: PSQL_USERNAME,
      password: PSQL_PASSWORD,
      database: PSQL_DATABASE,
      entities,
      synchronize: false,
      logging: true,
      name: 'default',
    })
  }
}
