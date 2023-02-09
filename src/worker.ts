
import { Worker } from 'bullmq'
import { LogModel } from './models/log';

const redisConfiguration = {
  connection: {
    host: process.env.R7PLATFORM_WORKER_LOG_REDIS_HOST || "localhost",
    port: Number(process.env.R7PLATFORM_WORKER_LOG_REDIS_PORT) || 6379,
    enableOfflineQueue: false,
    password: process.env.R7PLATFORM_WORKER_LOG_REDIS_PASSWORD || "redispw"
  }
}

const CONCURRENCY = process.env.R7PLATFORM_WORKER_LOG_CONCURRENCY ?
  Number(process.env.R7PLATFORM_WORKER_LOG_CONCURRENCY) : 4


const logModel = new LogModel()

const worker = new Worker('LOG', async (job: any) => {
  const data = job.data
  await logModel.saveTransactionLog(data)
}, {
  limiter: {
    max: 100,
    duration: 1000,
  },
  concurrency: CONCURRENCY,
  connection: redisConfiguration.connection
});

// Job success
worker.on('completed', (job: any) => {
  console.info(`Trx ID: ${job.data.trx_id} has completed!`)
});

// Job failed
worker.on('failed', (job: any, err: any) => {
  console.error(`Trx ID: ${job.data.trx_id} has failed with ${err.message}`)
});

// Worker error
worker.on('error', err => {
  console.error(err)
})

