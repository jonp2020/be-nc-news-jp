exports.handleInvalidPath = (req, res, next) => {

    res.status(404).send({msg:'path not found'})
}


exports.handleCustomErrors = (err, req, res, next) => {
    
    console.log('i am in the error handler')

    if(err.status){
        res.status(400).send('path not found')
    }
}