const express = require('express')
const router = express.Router()
const getAllBicycles = require('../controllers/bicycles')

router.route('/').get(getAllBicycles)

module.exports = router