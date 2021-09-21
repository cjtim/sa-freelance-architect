import { createConnection, getConnection } from 'typeorm'
import { Photo } from '../entity/user'

export async function connectDB() {
  try {
    getConnection()
  } catch (e) {
    const { DB_HOST, DB_PASSWORD, DB_USER, DB_NAME } = process.env
    await createConnection({
      type: 'postgres',
      host: DB_HOST,
      port: 5432,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [Photo],
      synchronize: true,
      logging: true,
    })
  }
}
