import { createConnection, getConnection } from 'typeorm'
import { Photo } from '../entity/photo'

const entities = [Photo]

export async function connectDB() {
  try {
    const connection = getConnection()
    if (!connection.isConnected) {
      throw Error('No connection')
    }
  } catch (e) {
    const { DB_HOST, DB_PASSWORD, DB_USER, DB_NAME } = process.env
    await createConnection({
      type: 'postgres',
      host: DB_HOST,
      port: 5432,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities,
      synchronize: true,
      logging: true,
      name: 'default',
    })
  }
}
