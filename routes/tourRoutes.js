const express = require('express');
const {
  getAllTours,
  addTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
} = require('./../controllers/tourController.js');

const router = express.Router();

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/').get(getAllTours).post(addTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
