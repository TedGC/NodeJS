const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// we can assure that this function has the inital ID data stored in the DB 
// to work on it because the middlewares used in this file are handling 
// incoming requests meaning when 'npm start' runs the codes here, it first
// runs sequelize function below to make sure everything is registered and set up
// before it listens to localhost:3000.  After it runs successfully, the codes
// will run the middlewares afterwards. 


app.use((req, res, next) => {
    User.findByPk(1)
        //make sure that we don't overwrite the existing JS object values such as req.body
        // this code will now register all the available methods within sequelize
        // and we can access those methods whenever we call req.user in other files
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// creating associations between 'product' and 'user' within Sequlize
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product)

CartItem.belongTo(Cart, { constraints: true, onDelte: 'CASCADE' })
Cart.hasMany(CartItem)


sequelize
    .sync()
    .then(result => {
        return User.findByPk(1)
        // console.log(result)
    })
    .then(user => {
        if (!user) {
            User.create({
                name: 'ted',
                email: 'ted@google.com'
            })
        }
        return user // Promise.resolve(user)
        // this needs to be aligned with the promise set abvoe for User.create
        // but everything wihtin .then() will automatically be assgiend with 
        // Promise method 
    })
    .then(user => {
        console.log(user)
        app.listen(3000)
    })
    .catch(err => {
        console.log(err)
    })