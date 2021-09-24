import { createConnection, getConnection } from 'typeorm'
import CONFIG from '../config'
import { Files } from '../entity/files'
import { Projects } from '../entity/projects'

const entities = [Files, Projects]

export async function connectDB() {
  try {
    const connection = getConnection()
    if (!connection.isConnected) {
      throw Error('No connection')
    }
  } catch (e) {
    console.info('Connecting db...')
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
