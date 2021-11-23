const mongoose = require('mongoose')

const url = process.env.MONGO_URI

//console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  amount: Number
})

const warehouseSchema = new mongoose.Schema({
  location: String,
  items: [productSchema]
})

warehouseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Warehouse', warehouseSchema)

