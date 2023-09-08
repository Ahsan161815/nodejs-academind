
const path = require('path');
const fs = require('fs');

module.exports = class Product{
    constructor(title){
        this.title = title;
    }
    
    save(){

        fs.readFile('data.json', (err, content)=>{
            let products = [];
            if (!err) {
                products = JSON.parse(content);
            }
            products.push(this); 
            fs.writeFile('data.json', JSON.stringify(products),(err)=>{
                console.log(err);
            });
        });        
        
    }

    static getAllProducts(callback){
        return fs.readFile('data.json', (error, content) => {
            if (error) {
                return callback([]);
            }
            return callback(JSON.parse(content)) ;
        });
    }

}