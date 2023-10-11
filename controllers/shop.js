const Product = require('../models/product');
const Cart =  require('../models/cart');

exports.getProducts = (req, res, next) => {

  Product.findAll().then((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(error => console.log(error));
};

exports.getProductDetail = (req, res, next) => {
  const prodId =  req.params.productId;
  
  Product.findByPk(prodId).then((product)=>{
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

  Product.findAll().then((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(error => console.log(error));
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then(cart => {
    console.log(cart);
    cart.getProducts().then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        cart: products,
      });
    }).catch(error => console.log(error));
  });
};

exports.cartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart().then(
    cart => {
      return cart.getProducts({where: {id: prodId}});
    }
  ).then(
    products => {
      const product = products[0];
      return product.cartItem.destroy();
    }
  ).then(
    result => {
      res.redirect('/cart');
    }
  ).catch(error => console.log(error));
  res.redirect('/cart');
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;

  req.user.getCart().then(cart => {
    let myCart = cart;
    return cart.getProducts({where: {id: productId}}).then(products => {
      console.log(products);
      let product;
      if(products.length > 0){
        product = products[0];
        // return cart.addProduct(products[0], {through: {quantity: 1}});
      }
      if(product){
        const oldQuantity = myCart.cartItem.quantity;
        console.log(oldQuantity);
        const newQuantity = oldQuantity + 1;
        return Product.findByPk(productId).then(p => {
          return myCart.addProduct(p, {through: {quantity: newQuantity}});
        });
      }
      return Product.findByPk(productId).then(p => {
        return myCart.addProduct(p, {through: {quantity: 1}});
      }).catch(error => console.log(error));
      // Product.findByPk(productId).then(p => {
      //   return myCart.addProduct(p, {through: {quantity: 1}});
      // })
      // return myCart.addProduct(product, {through: {quantity: 1}});
    }).catch(error => console.log(error));
  })
  res.redirect('/cart');
};

exports.postOrder = (req, res, next) => {
  req.use.getCart({include:['products']}).then(cart => {
    return cart.getProducts();
  }).then(products => {
    console.log(products);
  }).catch(error => console.log(error));
}

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
