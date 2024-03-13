const Bicycle = require('../models/Bicycle')

const getAllBicycles = async (req, res) => {
    const { featured, company, name, released_date, sort, fields, numericFilters } = req.query
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

    if (numericFilters) {
        const operatorMap = {
            '=': '$eq',
            '>': '$gt',
            '>=': '$gte',
            '<': '$lt',
            '<=': '$lte',
        }
        // first removing spaces
        let filters = numericFilters.replace(/\s/g, '')
        const regEx = /\b(=|>|>=|<|<=)\b/g
        filters = filters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        )
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        })

    }
    // console.log(queryObject)
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

    // selecting
    if (fields) {
        const newFieldsList = fields.replace(/\s/g, '').split(',').join(' ')
        result = result.select(newFieldsList)
    }

    // limiting & pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)

    const getAllData = await Bicycle.find({})

    const bicycles = await result

    res.status(200).json({
        size: bicycles.length,
        page,
        hasNextPage: getAllData.length >= (page * limit) ? true : false,
        bicycles
    })
}

module.exports = getAllBicycles