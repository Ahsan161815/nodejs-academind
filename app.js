const path = require('path');
const sequelize = require('./util/database');
const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
Cart.belongsTo(User);
User.hasOne(Cart);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });


sequelize
// .sync({force: true})
.sync()
.then((result) => {
    return User.findByPk(1);
    
    // console.log(result);
})
.then((user) => {
    if(!user){
        return User.create({firstName: 'Ahsan', lastName: 'A', email: 'Yq1wq@example.com'});
    }
    return user;})
.then(user => {
    return user.createCart();
})
.then(cart => {
    console.log('server started');
    app.listen(3000);
})
.catch((error) => console.log(error));


