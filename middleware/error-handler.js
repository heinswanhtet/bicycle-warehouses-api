const errorHandlerMiddleWare = async (err, req, res, next) => {
    console.log(err)
    res.status(500).json({ msg: 'Oops! Something went wrong. Please try again later' })
}

module.exports = errorHandlerMiddleWare