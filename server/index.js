require('dotenv').config({ path: __dirname + '/../.env' }); 
const express = require('express'); 
const session = require('express-session'); 
const checkForSession = require('./middlewares/checkForSession'); 
const swagCtrl = require('./controllers/swagContoller'); 
const authCtrl = require('./controllers/authController'); 
const cartCtrl = require('./controllers/cartController'); 
const searchCtrl = require('./controllers/searchController'); 
const app = express(); 

//let
let{ SERVER_PORT, SESSION_SECRET } = process.env; 

//app.use
app.use(express.json()); 
app.use(
    session({
        secret: SESSION_SECRET, 
        resave: false, 
        saveUninitialized: true
    })
)
app.use(checkForSession); 
app.use(express.static(`${__dirname}/../build`)); 

//gets/posts
app.get('/api/swag', swagCtrl.read); 
app.post('/api/login', authCtrl.login); 
app.post('/api/register', authCtrl.register); 
app.post('/api/signout', authCtrl.signout); 
app.get('/api/user', authCtrl.getUser); 
app.post('/api/cart/checkout', cartCtrl.checkout); 
app.post('/api/cart/:id', cartCtrl.add); 
app.delete('/api/cart/:id', cartCtrl.delete); 
app.get('/api/search', searchCtrl.search); 

//app.listen
app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
})