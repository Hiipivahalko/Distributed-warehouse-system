const bullmq = require('bullmq')
const { processOrder } = require("./order-worker");
const { redisOptions, queue_name } = require('../config')

// job queue
const ordersQueue = new bullmq.Queue(queue_name, {
  connection: redisOptions
});

// job queue worker
const worker = new bullmq.Worker(queue_name, async job => {
  await processOrder(job.data)
}, { connection: redisOptions });

// creating new job
const createNewOrder = async (order) => {
  const job = await ordersQueue.add(queue_name, order,{ 
    attempts: 1
  });
  return job.id
};

const queueEvents = new bullmq.QueueEvents(queue_name, {
  connection: redisOptions
});


// logging to see that job is on process
queueEvents.on('progress', ({jobId, data}) => {
  // jobId received a progress event
  console.log('process:', jobId, 'is under work');
});


module.exports = {
  createNewOrder,
};