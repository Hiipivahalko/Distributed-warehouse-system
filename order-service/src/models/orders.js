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

const orderSchema = new mongoose.Schema({
  user: String,
  location: String,
  time: Date,
  items: [productSchema]
})

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Orders', orderSchema)

