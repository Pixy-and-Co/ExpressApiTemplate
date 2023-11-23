import dotenv from 'dotenv'
import express from 'express'
import https from 'https'
import cors from 'cors'
import registerRoutes from './routes/index.mjs'

dotenv.config()

const app = express()
const port = parseInt(process.env.PORT || '3000')

app.use(express.json()).use(cors())

await registerRoutes(app)
app.listen(port, async _ => {
    // TODO: load database
    console.log(`Listening on: http://localhost:${port}/`)
})
