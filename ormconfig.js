module.exports = {
  type: 'postgres',
  host: process.env.PSQL_HOSTNAME,
  port: 5432,
  username: process.env.PSQL_USERNAME,
  password: process.env.PSQL_PASSWORD,
  database: process.env.PSQL_DATABASE,
  synchronize: process.env.NODE_ENV !== 'production',
  logging: true,
  name: 'default',
  entities: [`${__dirname}/src/pages/api/entity/**/*.{ts,js}`],
  migrations: [`${__dirname}/src/pages/api/migration/**/*.{ts,js}`],
  subscribers: [`${__dirname}/src/pages/api/subscriber/**/*.{ts,js}`],
  cli: {
    entitiesDir: 'src/pages/api/entity',
    migrationsDir: 'src/pages/api/migration',
    subscribersDir: 'src/pages/api/subscriber',
  },
}
