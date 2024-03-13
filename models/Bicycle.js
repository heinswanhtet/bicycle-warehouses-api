const mongoose = require('mongoose')

const bicycleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'bicycle name must be provided']
    },
    price: {
        type: Number,
        required: [true, 'bicycle price must be provided']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 2.5
    },
    released_date: {
        type: Date,
        required: [true, 'bicycle release date must be provided']
    },
    company: {
        type: String,
        enum: {
            values: ['trek', 'cervelo', 'kona', 'scott', 'marin', 'bianchi'],
            message: '{VALUE} is not supported'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Bicycle', bicycleSchema)