exports.getProducts = (req,res,next) => {
    res.json({
        success: true,
        message: 'all products'
    })
}