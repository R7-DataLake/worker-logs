
import { Worker } from 'bullmq'
import tasks from './tasks'

const redisConfiguration = {
  connection: {
    host: process.env.R7PLATFORM_WORKER_METADATA_REDIS_HOST || "localhost",
    port: Number(process.env.R7PLATFORM_WORKER_METADATA_REDIS_PORT) || 6379,
    enableOfflineQueue: false,
    password: process.env.R7PLATFORM_WORKER_METADATA_REDIS_PASSWORD || "redispw"
  }
}

const CONCURRENCY = process.env.R7PLATFORM_WORKER_METADATA_CONCURRENCY ?
  Number(process.env.R7PLATFORM_WORKER_METADATA_CONCURRENCY) : 4

const worker = new Worker('METADATA', tasks, {
  limiter: {
    max: 100,
    duration: 1000,
  },
  concurrency: CONCURRENCY,
  connection: redisConfiguration.connection
});

// Job success
worker.on('completed', (job: any) => {
  console.info(`${job.id} has completed!`)
});

// Job failed
worker.on('failed', (job: any, err: any) => {
  console.error(`${job.id} has failed with ${err.message}`)
});

// Worker error
worker.on('error', err => {
  console.error(err)
})

