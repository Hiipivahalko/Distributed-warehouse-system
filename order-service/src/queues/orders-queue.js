const bullmq = require('bullmq')
const { processOrder } = require("./order-worker");
const { redisOptions, queue_name } = require('../config')


const ordersQueue = new bullmq.Queue(queue_name, {
  connection: redisOptions
});

const worker = new bullmq.Worker(queue_name, async job => {
  console.log('HELLO WORLD, INSIDE WORKER');
  const process_res = await processOrder(job.data)

  return process_res
}, { connection: redisOptions });


const createNewOrder = async (order) => {
  const job = await ordersQueue.add(queue_name, order,{ 
    attempts: 1
  });
  return job.id
};

const queueEvents = new bullmq.QueueEvents(queue_name, {
  connection: redisOptions
});


queueEvents.on('progress', ({jobId, data}) => {
  // jobId received a progress event
  console.log('process:', jobId, 'is under work');
});


module.exports = {
  createNewOrder,
};