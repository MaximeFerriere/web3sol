const mongoose = require('mongoose')



// Define Schema
const eventSchema = new mongoose.Schema({
  date: String,
  child: mongoose.Schema.Types.ObjectId,
  name: String
})

eventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



// Export model
module.exports = mongoose.model('events', eventSchema)