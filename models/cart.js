const path = require('path');
const fs = require('fs');



module.exports = class Cart {
    constructor(){
        this.products = [];
        this.totalPrice = 0;

    }


    static addProduct(id, productPrice){
        fs.readFile('data/cart.json', (err, fileContent) => {
            // fetch the previous cart
            let cart = {products:[], totalPrice: 0, totalQty:0};
            if(!err){
                cart = JSON.parse(fileContent);
            }
            // const existingProduct = cart.products.findIndex(p => p.id === id);
            
            const existingProductIndex = cart.products.findIndex(p => p.id === id);
            if(existingProductIndex >= 0 && existingProductIndex !== undefined){
                cart.products[existingProductIndex].qty++;
            }else{
                cart.products = [...cart.products, {id: id, qty: 1}];

                // cart.products.push({id: id, qty: 1});

            }
            cart.totalPrice += +productPrice;
            cart.totalQty++;

            console.log(cart);
            fs.writeFile('data/cart.json', JSON.stringify(cart), err =>{
                console.log(err);
            })          

        })
    }

    static deleteProduct(id){
        fs.readFile('data/cart.json', (error, fileContent)=>{
            if(error){
                console.log(error);
                return;
            }
            
            const cart = JSON.parse(fileContent);
            if(cart.length === 0){
                console.log('---------product cart delete');
                console.log('no products found');
                return;
            }
            const product = cart.products.find(p => p.id === id);
            if(product === undefined){
                console.log('---------product cart delete');
                console.log('no products found');
                return;
            }
            // const updatedCart = {...cart};
            const updatedCart = cart.products.filter(prod => prod.id !== id);
            cart.totalPrice -=  product.price * product.qty;
            cart.totalQty -= 1;
            fs.writeFile('data/cart.json', JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        })
    }

    static getCart(cb){
        fs.readFile('data/cart.json', (err, fileContent)=>{
            if(err){
                cb(null);
            }else{
                const cart = JSON.parse(fileContent);
                cb(cart);
            }
        });
    }

    static deleteCart(productId){
        fs.readFile('data/cart.json', (error, fileContent)=>{
            if(error){
                console.log(error);
                return;
            }
            
            const cart = JSON.parse(fileContent);
            const product = cart.products.find(p => p.id === productId);
            if(product === undefined){
                console.log('---------product cart delete');
                console.log('no products found');
                return;
            }
            // const updatedCart = {...cart};
            const updatedCart = cart.products.filter(prod => prod.id !== productId);
            cart.totalPrice -=  product.price * product.qty;
            cart.totalQty -= 1;
            fs.writeFile('data/cart.json', JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        })
        
    }

}