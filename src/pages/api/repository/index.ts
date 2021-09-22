import { createConnection, getConnection } from 'typeorm'
import CONFIG from '../config'
import { Photo } from '../entity/photo'

const entities = [Photo]

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
      synchronize: process.env.NODE_ENV !== 'production',
      logging: true,
      name: 'default',
    })
  }
}