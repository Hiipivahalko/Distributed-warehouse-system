const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  amount: Number
}, { _id : false, __v: false })

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

