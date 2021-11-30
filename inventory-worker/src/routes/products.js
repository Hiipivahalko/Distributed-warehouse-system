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
  
  productsRouter.post('/', async (request, response) => {
    const product = request.body

    const existingProducts = await Products.find( { name: product.name } )

    if (!existingProducts || !existingProducts.length) {
      const productToSave = new Products({
        name: product.name,
        locations: product.locations
      })

      await productToSave.save()
        .then(result => {
          console.log("worker saved the item")
          response.status(204).end()
        })

    } else {

      await Products.updateMany(
          { name: product.name },
          {locations: product.locations}
        ).then(result => {
          console.log("worker updated item(s) with the same name")
          response.status(204).end()
      })

    }
  })

  module.exports = productsRouter