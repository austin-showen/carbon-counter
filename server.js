const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const AuthRouter = require('./routes/auth')
const VehicleRouter = require('./routes/vehicles')
const TripRouter = require('./routes/trips')
const ApplianceRouter = require('./routes/appliances')

const PORT = process.env.PORT || 3001

const db = require('./db')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', AuthRouter)
app.use('/vehicles', VehicleRouter)
app.use('/trips', TripRouter)
app.use('/appliances', ApplianceRouter)

app.use('/', (req, res) => {
  res.send(`Connected!`)
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
