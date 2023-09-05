

const products = [];
exports.getAddProduct = (req, res, next) => {
    res.render('add-product',{route:"/admin/add-product", title:'Add Products'});
}


exports.postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title, });
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    res.render('shop',{products:products,title:"Shop", route:"/shop", hasProducts:products.length>0});
}



