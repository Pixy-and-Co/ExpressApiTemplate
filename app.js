require('module-alias/register')
require('dotenv').config()

const { registerRoutes } = require('./handlers/routes.handler')
const express = require('express')
const https = require('https')
const cors = require('cors')

const app = express()
const port = parseInt(process.env.PORT || '3000')

app.use(express.json()).use(cors())

registerRoutes(app)

app.listen(port, async _ => {
    // TODO: load database
    console.log(`Listening on: http://localhost:${port}/`)
})
