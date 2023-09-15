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
            
            const existingProduct = cart.products.find(p => p.id === id);
            if(existingProduct){
                cart.products.find(p => p.id === id).qty++;

            }else{
                cart.products.push({id: id, qty: 1});

            }
            cart.totalPrice += +productPrice;
            cart.totalQty++;

            console.log(cart);
            fs.writeFile('data/cart.json', JSON.stringify(cart), err =>{
                console.log(err);
            })          

        })
    }

}