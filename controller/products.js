const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product',{route:"/admin/add-product", title:'Add Products'});
}


exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.getAllProducts((products)=>{
        res.render('shop',{products:products,title:"Shop", route:"/shop", hasProducts:products.length>0});
    });
}



