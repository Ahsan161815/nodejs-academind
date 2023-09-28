const Product = require('../models/product');
const Cart =  require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([row,field]) => {
    res.render('shop/product-list', {
      prods: row,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(error => console.log(error));
};

exports.getProductDetail = (req, res, next) => {
  const prodId =  req.params.productId;
  
  Product.getProductbyId(prodId).then(([row,field])=>{
    res.render('shop/product-detail', {
      product: row[0],
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
  Product.fetchAll().then(([row,field]) => {
    res.render('shop/index', {
      prods: row,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(error => console.log(error));
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    if(cart === null){
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
      });
      return;
    }

    Product.fetchAll(products => {
      const cartProducts = [];
      for(product of products){
        if(cart.length === 0){
          break;
        }
        if(cart.products.find(p => p.id === product.id) !== undefined){
          // cartProducts.push({title:product.title, price:product.price, productId:product.id});
          cartProducts.push({product:product, qty:cart.products.find(p => p.id === product.id).qty});
        }else{
          // cartProducts.push({title:product.title, price:product.price, productId:product.id});
          // cartProducts.push({product:product, qty:0});
          console.log('---------product cart');
        }
      }
      console.log(cartProducts);
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        cart: cartProducts,
      });
    });
  });
};

exports.cartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Cart.deleteCart(prodId);
  console.log(prodId);
  res.redirect('/cart');
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
