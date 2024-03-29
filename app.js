require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./db/connection')
const bicyclesRouter = require('./routes/bicycles')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleWare = require('./middleware/error-handler')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Bicycle Warehouse API!</h1><a href="/api/v1/bicycles">Click here to view API</a>')
})

app.use('/api/v1/bicycles', bicyclesRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleWare)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on http://localhost:${port}/`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()