import { Knex } from "knex"

export default async (): Promise<Knex<any, any[]>> => {
  return require('knex')({
    client: 'pg',
    connection: {
      host: process.env.R7PLATFORM_WORKER_LOG_DB_HOST || 'localhost',
      user: process.env.R7PLATFORM_WORKER_LOG_DB_USER || 'postgres',
      port: Number(process.env.R7PLATFORM_WORKER_LOG_DB_PORT) || 5432,
      password: process.env.R7PLATFORM_WORKER_LOG_DB_PASSWORD || '',
      database: process.env.R7PLATFORM_WORKER_LOG_DB_NAME || 'test',
    },
    searchPath: [process.env.R7PLATFORM_WORKER_LOG_DB_SCHEMA || 'public'],
    debug: process.env.NODE_ENV === "development" ? true : false,
  })
}
