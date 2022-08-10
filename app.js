const express = require('express')
const isMatch = require('date-fns/isMatch')
const differenceInYears = require('date-fns/differenceInYears')
const app = express()
const rateLimit = require('express-rate-limit')
const port = process.env.PORT || 5222
const host = '0.0.0.0'

const limiter = rateLimit({
  windowMs: 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  message: {'error': 'You can only make 3 calls per second'}
})


const splitDate = (date) => date.split('/')

app.use(limiter)

app.set('trust proxy', 1)

app.get('/', (req, res) => {
  return res.send('Welcome to the Age Api')
})

app.get('/howold', (req, res) => {
  try {
    if (!req.query.dob) {
      return res.status(422).json({
        'error': 'dob is required'
      })
    }
    if (!isMatch(req.query.dob, 'd/M/yyyy')) {
      return res.status(400).json({
        'error': 'Invalid date, the format is d/m/yyyy'
      })
    }

    const [day, month, year] = splitDate(req.query.dob)
    monthIndex = month - 1
    const age = differenceInYears(new Date(), new Date(year, monthIndex, day))
    
    return res.status(200).json({
      'data': age,
      'message': `You are ${age} years old`
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      'error': 'Error occured while processing your request'
    })
  }
})

app.listen(port, host, () => {
  console.log(`App listening on port ${port}`)
})
