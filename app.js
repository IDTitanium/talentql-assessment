const express = require('express')
// const isMatch = require('date-fns/isMatch')
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

app.use(function(_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(limiter)

app.set('trust proxy', 1)

app.get('/', (_req, res) => {
  return res.send('Welcome to the Age Api, version 1.0.0')
})

app.get('/howold', (req, res) => {
  try {
    if (!req.query.dob) {
      return res.status(422).send({
        'error': 'dob is required'
      })
    }
    // if (!isMatch(req.query.dob, 'd/M/yyyy')) {
    //   return res.status(400).send({
    //     'error': 'Invalid date format, the format is d/m/yyyy'
    //   })
    // }

    const [day, month, year] = splitDate(req.query.dob)
    let date
    if (!day || !month || !year) {
      if (isNaN(Number(req.query.dob))) {
        return res.status(422).send({
              'error': 'Invalid date format, try the format d/m/yyyy'
            })
      }
      date = new Date(Number(req.query.dob))
    } else {
      const monthIndex = month - 1
      date = new Date(year, monthIndex, day)
    }

    const age = differenceInYears(new Date(), date)
    
    return res.status(200).send({
      'age': age,
      'message': `You are ${age} years old`
    })
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      'error': 'Error occured while processing your request'
    })
  }
})

app.listen(port, host, () => {
  console.log(`App listening on port ${port}`)
})
