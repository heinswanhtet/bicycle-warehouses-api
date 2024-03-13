const Bicycle = require('../models/Bicycle')

const getAllBicycles = async (req, res) => {
    const { featured, company } = req.query
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }

    if (company) {
        queryObject.company = company
    }

    const bicycles = await Bicycle.find(queryObject)

    res.status(200).json({ size: bicycles.length, bicycles })
}

module.exports = getAllBicycles