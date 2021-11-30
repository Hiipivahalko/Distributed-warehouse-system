// const axios = require('axios')

const productsRouter = require('express').Router()
const Products = require('../models/products')

const url = process.env.MONGO_URI


productsRouter.get('/', async (request, response) => {
    try {
      const products = await Products.find( {} )
      console.log("Returning items")
      console.log(products)
      response.send(products)
      return
    } catch (error) {
      console.log(error.message)
    }
    response.send({error: 'some error happened on /api/workers/inventory'})
  })
  
  productsRouter.post('/', (request, response) => {
    //TODO:Get items from database
    //const items
    if(items.length == request.params.items.length) {
      //TODO:Remove items from database
      response.send(items)
    } else {
      response.send({})
    }
    
  })

  module.exports = productsRouter