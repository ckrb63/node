const express = require('express');

const router = express.Router();

router.route('/').get(getAllUsers).post(addUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

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

module.exports = router;
