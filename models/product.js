const fs = require('fs');
const path = require('path');
const Cart = require('../models/cart');
const db = require('../util/database');


const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {


    return db.execute('INSERT INTO products (title, imageUrl, description, price) VALUES (?, ?, ?, ?)', [this.title, this.imageUrl, this.description, this.price]);
    // db.execute('SELECT * FROM products').then(([row,field]) => {
    //   if(this.id){
    //     const existingProductIndex = row.findIndex(prod => prod.id === this.id);
    //     const updatedProducts = [...products];
    //     updatedProducts[existingProductIndex] = this;
    //     db.execute('UPDATE * in products WHERE id=1');
    //     // fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //     //   console.log(err);
    //     // });
    //   }else{
    //     this.id = Math.random().toString();
    //     products.push(this);
    //     fs.writeFile(p, JSON.stringify(products), err => {
    //       console.log(err);
    //     });
    //   }
    // });
    
    // getProductsFromFile(products => {
    //   if(this.id){
    //     const existingProductIndex = products.findIndex(prod => prod.id === this.id);
    //     const updatedProducts = [...products];
    //     updatedProducts[existingProductIndex] = this;
    //     fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //       console.log(err);
    //     });
    //   }else{
    //     this.id = Math.random().toString();
    //     products.push(this);
    //     fs.writeFile(p, JSON.stringify(products), err => {
    //       console.log(err);
    //     });
    //   }
    // });
  }

  static delete(productId){
    getProductsFromFile(products => {
      const updatedProducts = products.filter(prod => prod.id !== productId);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if(!err){
          Cart.deleteProduct(productId);
        }
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    // getProductsFromFile(cb);
    return db.execute('SELECT * FROM products');
  }

  static getProductbyId(id) {
   return db.execute('SELECT * FROM products WHERE id=?', [id]);
  }
};
