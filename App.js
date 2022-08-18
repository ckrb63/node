const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

// 1) MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json()); // express.json이 middleware이다
// 만약 이 middleware가 없으면 json 형식의 request.body를 출력하였을 때 undefined가 나옴

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) ROUTE HANDLER
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: tours.length,
    data: { tours: tours },
  });
};

const getTour = (req, res) => {
  console.log(req.params.id);

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (tour) {
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
};

const addTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 <= tours.length) {
    res.status(200).json({
      status: 'success',
      data: {
        tour: 'tour updated!',
      },
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 <= tours.length) {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'api not prepared!',
  });
};

const addUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'api not prepared!',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'api not prepared!',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'api not prepared!',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'api not prepared!',
  });
};
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', addTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3) ROUTES

const userRouter = express.Router();
const tourRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(addTour);

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(addUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

// 왼쪽의 경로일 때 오른쪽의 Router 실행
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
