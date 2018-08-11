const express = require('express')

var bodyParser = require('body-parser')

const app = express()

const ApiLink = require('./router/ApiLink')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use('/api', ApiLink)

app.use('/', (req, res) => {
  res.send('Yo!')
})

app.listen(3000, () => {
  console.log('app listening on port 3000.')
})
