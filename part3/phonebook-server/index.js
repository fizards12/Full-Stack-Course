require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./Person')

const PORT = process.env.PORT || 3001
const app = express()

const errorHandler = (err, req, res, n) => {
  console.log(err.name)
  if (err.name === 'CastError') {
    res.status(400).send(err)
  } else if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message })
  } else {
    n(err)
  }
}

const unknwonHandler = (req, res) => {
  res.status(404).send('unknown endpoint')
}

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

//Middlewares
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(
  morgan((tokens, req, res) =>
    [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens.body(req, res),
    ].join(' ')
  )
)

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((people) => {
      res.json(people)
    })
    .catch((err) => next(err))
})
app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: 'Person Information Not found' })
      }
      return res.json(result)
    })
    .catch((err) => next(err))
})

app.get('/api/info', (req, res, next) => {
  Person.find({})
    .then((people) => {
      const currentDate = new Date()
      if (!people) {
        res.send(`<p>Phonebook has no information</br>${currentDate}</p>`)
      } else {
        const length = people.length
        res.send(
          `<p>Phonebook has info for ${length} people </br>${currentDate}</p>`
        )
      }
    })
    .catch((err) => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const body = { ...req.body }
  Person.findOne({ name: body.name })
  if (!body.name) {
    return res.status(400).json({ error: 'name is missing' })
  } else if (!body.number) {
    return res.status(400).json({ error: 'number is missing' })
  } else {
    Person.findOne({ name: body.name }).then((person) => {
      if (person) {
        res.status(400).json({ error: 'name must be unique' })
      } else {
        const newPerson = new Person({
          name: body.name,
          number: body.number,
        })
        newPerson
          .save()
          .then((result) => {
            console.log(`${newPerson.name} Saved successfully`)
            res.status(201).json(result)
          })
          .catch((err) => next(err))
      }
    })
  }
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body
  Person.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      res.status(201).json(updatedPerson)
    })
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.status(204).end()
      } else {
        res.status(404).json({ error: 'Person Information has been already deleted' })
      }
    })
    .catch((err) => next(err))
})
app.use(unknwonHandler)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`The server runs on PORT ${PORT}`)
})
