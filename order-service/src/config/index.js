const redisOptions = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
} 

const queue_name = 'order_queue'

module.exports = {
  redisOptions,
  queue_name
}