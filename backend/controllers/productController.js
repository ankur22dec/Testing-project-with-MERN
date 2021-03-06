
const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')


// get all products
exports.getProducts = async (req,res,next) => {

    const resPerPage = 4;
    const productCount = await Product.countDocuments()

    const apiFeatures = new APIFeatures(Product.find(),req.query).search().filter().pagination(resPerPage)

    const products = await apiFeatures.query;
    res.json({
        success: true,
        products,
        count : products.length
    })
}

//get single product 

exports.getSingleProduct = async (req,res,next) => {

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }

    res.json({
        success: true,
        product
    })
}


//update products 

exports.updateProduct = async (req,res,next) => {

    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success: false,
            message : 'product not found'
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body, {
        new:true,
        runValidators:true
    })

    res.json({
        success: true,
        product
    })
}

//delete products 

exports.deleteProduct = async (req,res,next) => {

    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success: false,
            message : 'product not found'
        })
    }

    await product.deleteOne();

    res.json({
        success: true,
        product
    })
}


// create product

exports.newProduct = catchAsyncErrors(async (req,res,next) => {

    const product = await Product.create(req.body);

    res.json({
        success: true,
        product
    })
})