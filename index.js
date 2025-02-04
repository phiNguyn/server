var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
// require('./mongo/user.model')
// require('./mongo/product.model')
// require('./mongo/category.model')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/categories');
var productsRouter = require('./routes/products');
var ordersRouter = require('./routes/orders');
var orderItemRouter = require('./routes/orderItem');
var photoRouter = require('./routes/photos');
var emailRouter = require('./routes/email');
var momoRoutes = require('./routes/momo');
// var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ket noi mongodb
// process.env.MONGODB_URI+process.env.DATABASE_NAME

mongoose.connect(process.env.MONGODB_URI+process.env.DATABASE_NAME)
  .then(() => console.log("ket noi thanh cong" ))
  .catch((error) => console.log(error))

//  dinh nghia routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/orderItem', orderItemRouter);
app.use('/photos',photoRouter)
app.use('/email',emailRouter)
app.use('/momo',momoRoutes)
// app.use('/api', apiRouter);
 
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
