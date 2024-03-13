const Bicycle = require('../models/Bicycle')

const getAllBicycles = async (req, res) => {
    const { featured, company, name, released_date } = req.query
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }

    if (company) {
        queryObject.company = company
    }

    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }

    if (released_date) {
        queryObject.released_date = { $gt: new Date(released_date) }
    }

    const bicycles = await Bicycle.find(queryObject)

    res.status(200).json({ size: bicycles.length, bicycles })
}

module.exports = getAllBicycles