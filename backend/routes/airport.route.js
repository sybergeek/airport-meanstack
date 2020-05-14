const express = require('express');
const app = express();
const airportRoute = express.Router();

// Airport model
let Airport = require('../model/Airport');

// Add Airport
airportRoute.route('/add-airport').post((req, res, next) => {
  Airport.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all airport
airportRoute.route('/').get((req, res) => {
  Airport.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single airport
airportRoute.route('/read-airport/:id').get((req, res) => {
  Airport.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update airport
airportRoute.route('/update-airport/:id').put((req, res, next) => {
  Airport.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (error, data) => {
    if (error) {
      // console.log('entering findByIdAndUpdate with error');
      return next(error);
      // console.log(error)
    } else {
      // console.log('entering findByIdAndUpdate');
      res.json(data);
      console.log('Airport successfully updated!');
    }
  })
})

// Delete airport
airportRoute.route('/delete-airport/:id').delete((req, res, next) => {
  Airport.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = airportRoute;