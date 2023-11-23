require('module-alias/register')
require('dotenv').config()

const express = require('express')
const https = require('https')
const cors = require('cors')

const app = express()
const port = parseInt(process.env.PORT || '3000')

app.use(express.json()).use(cors())

require('@routes')(app)

app.listen(port, async _ => {
    // TODO: load database
    console.log(process.env.NODE_ENV)
    console.log(`Listening on: http://localhost:${port}/`)
})
