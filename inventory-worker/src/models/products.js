const mongoose = require('mongoose')


const init_data = [
  {
    id: "452452436", 
    name: "electric bicycle",
    locations: [
      {location: "Helsinki", amount: 100},
      {location: "Oulu", amount: 41},
    ]
  },
  {
    id: "9768952342",
    name: "electric jetpack",
    locations: [
      {location: "Helsinki", amount: 5000},
      {location: "Oulu", amount: 1},
    ]
  },
  {
    id: "0249342095",
    name: "tango shoes",
    locations: [
      {location: "Helsinki", amount: 4},
      {location: "Oulu", amount: 0},
    ]
  },
  {
    id: "12345679",
    name: "snowboard",
    locations: [
      {location: "Helsinki", amount: 31},
      {location: "Oulu", amount: 5},
    ]
  }
]



const warehouseSchema = new mongoose.Schema({
  location: String,
  amount: Number
}, { _id : false, __v: false })

const productSchema = new mongoose.Schema({
  name: String,
  locations: [warehouseSchema]
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Products', productSchema)