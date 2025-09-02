import express from 'express'
import dotenv from 'dotenv'
import { dbConfig } from './backend/db/config.js'
dotenv.config({ encoding: 'utf8' });
dbConfig()

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())


app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`)
})