// const axios = require('axios')

const productsRouter = require('express').Router()
const Products = require('../models/products')

const url = process.env.MONGO_URI


productsRouter.get('/', async (request, response) => {
    try {
      const products = await Products.find( {} )
      console.log("Returning items")
      response.send(products)
      return
    } catch (error) {
      console.log(error.message)
    }
    return response.send({error: 'some error happened on /api/workers/inventory'})
  })
  
  productsRouter.post('/', async (request, response) => {
    let existingProducts
    const product = request.body
    try {
      existingProducts = await Products.find( { name: product.name } )
    } catch (error) {
      console.log(error.message)
      return response.status(500).send({error: 'error when reaching for DB /api/workers/inventory'})
    }

    if (!existingProducts || !existingProducts.length) {
      try {
        const productToSave = new Products({
          name: product.name,
          locations: product.locations
        })
        const saved_product = await productToSave.save()
        return response.status(201).json(saved_product)
      } catch (error) {
        console.log(error.message)
        return response.status(500).send({error: `saving new item ${product.name} failed in /api/workers/inventory`})
      }
    }
    
    try {
      const update_many_res = await Products.updateMany(
        { name: product.name },
        {locations: product.locations}
      )
      console.log("worker updated item(s) with the same name")
      return response.status(200).json(update_many_res)
    } catch (error) {
      console.log(error.message)
      return response.status(500).send({error: `updating items named ${product.name} failed in /api/workers/inventory`})
    }
  })

  productsRouter.delete('/all', async (request, response) => {
    console.log('Worker trying to remove all items from DB');
    try {
      const delete_res = await Products.remove({})
      return response.status(200).json({message: 'deleting went fine'})
    } catch (error) {
      return response.status(403).json({err: error.message})
    }
    
  })

  productsRouter.post('/init', async (request, response) => {

    const init_data = [
      {
        name: "electric bicycle",
        locations: [
          {location: "Helsinki", amount: 100},
          {location: "Oulu", amount: 41},
        ]
      },
      {
        name: "electric jetpack",
        locations: [
          {location: "Helsinki", amount: 5000},
          {location: "Oulu", amount: 1},
        ]
      },
      {
        name: "tango shoes",
        locations: [
          {location: "Helsinki", amount: 4},
          {location: "Oulu", amount: 0},
        ]
      },
      {
        name: "snowboard",
        locations: [
          {location: "Helsinki", amount: 31},
          {location: "Oulu", amount: 5},
        ]
      }
    ]

    for (const p of init_data) {
      const new_item = new Products({
        name: p.name,
        locations: p.locations
      })
      try {
        await new_item.save()
      } catch (error) {
        console.error(error.message)
        return response.status(401).json({error: 'some error when trying to save init item to mongoDB'})
      }
    }

    return response.status(201).json({message: 'init data saved to mongoDB'})
  })

  module.exports = productsRouter