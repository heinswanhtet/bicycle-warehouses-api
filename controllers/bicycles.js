const Bicycle = require('../models/Bicycle')

const getAllBicycles = async (req, res) => {
    const bicycles = await Bicycle.find({})

    res.status(200).json({ size: bicycles.length, bicycles })
}

module.exports = getAllBicycles