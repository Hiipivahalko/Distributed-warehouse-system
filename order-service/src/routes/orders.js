const orderRouter = require('express').Router()
const axios = require('axios')
const Orders = require('../models/orders')
const { createNewOrder } = require("../queues/orders-queue");
const bullmq = require('bullmq')
const { redisOptions, queue_name } = require('../config')

// sleep function to test job queue and performance
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


orderRouter.get('/', async (req, res) => {
  try {
    const all_orders = await Orders.find( {} )
    return res.json(all_orders)
  } catch (err) {
    console.log(err.message);
    return res.json({error: 'error happened'})
  }
})

orderRouter.post('/', async (request, response) => {
  const order = request.body
  if (!order.user || !order.location || !order.items) {
    return response.status(400).json({error: 'order miss information'})
  }

  try {
    await createNewOrder(order) // creating new job for the job queue
    return response.status(200).json({msg: 'Order is now under process. Go check http://localhost:3000/order-history your order status'})
  } catch (err) {
    console.log(err.message);
    return response.status(400).json({error: 'Could not handle order, check your order and try send again'})
  }
})

orderRouter.delete('/clearHistory', async (requset, response) => {
  console.log('order service deleting all orders from mongoDB');
  try {
    const delete_res = await Orders.remove({})
    return response.status(200).json({message: 'deleting went fine'})
  } catch (error) {
    return response.status(403).json({err: error.message})
  }
})

module.exports = orderRouter