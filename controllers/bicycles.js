const Bicycle = require('../models/Bicycle')

const getAllBicycles = async (req, res) => {
    const { featured, company, name, released_date, sort } = req.query
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

    let result = Bicycle.find(queryObject)

    // sorting
    if (sort) {
        const newSortList = sort.replace(/\s/g, '').split(',').join(' ')
        result = result.sort(newSortList)
    }
    // default sorting
    else {
        result = result.sort('createdAt')
    }

    const bicycles = await result

    res.status(200).json({ size: bicycles.length, bicycles })
}

module.exports = getAllBicycles