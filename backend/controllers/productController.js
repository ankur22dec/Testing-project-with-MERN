// get all products
const Product = require('../models/product')
exports.getProducts = async (req,res,next) => {
    const products = await Product.find()
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
        return res.status(404).json({
            success: false,
            message : 'product not found'
        })
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

exports.newProducts = async (req,res,next) => {

    const product = await Product.create(req.body);

    res.json({
        success: true,
        product
    })
}