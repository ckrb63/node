const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
// if (process.env.NODE_ENV == 'development') {
//   app.use(morgan('dev'));
// }
app.use(express.json()); // express.json이 middleware이다
// 만약 이 middleware가 없으면 json 형식의 request.body를 출력하였을 때 undefined가 나옴
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTE HANDLER


// 3) ROUTES

// 왼쪽의 경로일 때 오른쪽의 Router 실행
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) START SERVER
module.exports = app;
