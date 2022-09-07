const middleware = (err, req, res, next) =>{
    err.statusCode = err.statusCode || 500
    let error = { ...err}
    error.message = error.message
    res.status(err.statusCode).json({
        error,
        message: error.message,
        stack: error.stack
    })
}

export default middleware