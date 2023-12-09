const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to MongoDB database....')
mongoose.set('strictQuery', false)
mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.log('failed to connect: ', err)
    return err
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'name must be 3 characters or more'],
    required: [true, 'name is missing'],
  },
  number: {
    type: String,
    min: [8, 'must have length 8 or more'],
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{1,}/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
    required: [true, 'Please enter the phone number'],
  },
})

personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id.toString()
    delete ret._id
    delete ret.__v
  },
})

module.exports = mongoose.model('person', personSchema)
