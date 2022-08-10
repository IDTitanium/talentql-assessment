const express = require('express')
const isMatch = require('date-fns/isMatch')
const differenceInYears = require('date-fns/differenceInYears')
const parseISO = require('date-fns/parseISO')
const app = express()
const rateLimit = require('express-rate-limit')
const port = 5222

const limiter = rateLimit({
  windowMs: 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: {'error': 'You can only make 3 calls per second'}
})

const splitDate = (date) => date.split('/')

app.use(limiter)

app.get('/howold', (req, res) => {
  try {
    if (!isMatch(req.query.dob, 'd/M/yyyy')) {
      return res.status(400).json({
        'error': 'Invalid date, the format is 1/12/1990'
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
      'error': `Error occured while processing your request`
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
