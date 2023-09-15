const Product = require('../models/product');
const Cart =  require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
    
  });
};

exports.getProductDetail = (req, res, next) => {
  const prodId =  req.params.productId;
  
  Product.getProductbyId(prodId,product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: 'Product Detail Detail',
      path: '/products/<%= prodId %>'
    });
  });

  // Product.fetchAll(products => {
  //   // get product from product id
  //   // const product = products.find(prod => prod.id === prodId);
  //   Product.getProductbyId(product => {
  //     res.render('shop/product-detail', {
  //       product: product,
  //       pageTitle: 'Product Detail Detail',
  //       path: '/products/<%= prodId %>'
  //     });
  //   })
  // });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;

  Product.getProductbyId(productId, (product)=>{
    Cart.addProduct(productId, product.price);
  })
  // Cart.addProduct(productId, 20);

  console.log(productId);
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
