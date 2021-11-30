const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const mongoose = require('mongoose')
const productsRouter = require('./routes/products')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use('/api/products', productsRouter)


const url = process.env.MONGO_URI

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
    
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
const { waitForDebugger } = require('inspector')


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})



const PORT = 4001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
