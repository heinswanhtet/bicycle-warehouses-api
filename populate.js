require('dotenv').config()

const connectDB = require('./db/connection')
const Bicycle = require('./models/Bicycle')

const jsonBicycles = require('./bicycles.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Bicycle.deleteMany()
        await Bicycle.create(jsonBicycles)
        console.log('Success of creating json data to the cloud database!')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()