//Carregando módulos
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require('./routes/user');
//const path = require('path');
const session = require('express-session');
//const flash = require('connect-flash');
const cors = require('cors');
const app = express();

//Use cors
app.use(cors());

//session config
app.use(session({
    secret: 'qualquercoisa',
    resave: true,
    saveUninitialized: true
}));
//app.use(flash());

//Midleware config
/*app.use((req,res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next(); 
});*/

app.use(express.json());

//body-parser config
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//mongoose config
mongoose.Promise = global.Promise;
mongoose.connect(
    "mongodb://localhost:27017/nodeapi",
    {useUnifiedTopology: true,
    useNewUrlParser: true 
}).then(() => {console.log('Mongoose conectado');
}).catch((err) => {console.log('Erro ao conectar...: ' + err);
});
//require('./models/categoria.js');
require('./models/users.js');

//app.use('/admin', admin);
app.use('/user', user);

app.listen(8081, () => {
    console.log('Servidor conectado!');
});