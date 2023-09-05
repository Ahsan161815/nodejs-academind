const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const page404Controller = require('./controller/error');

app.set('view engine','ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(page404Controller.get404Page);

app.listen(3000);
