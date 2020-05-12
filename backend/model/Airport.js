const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Airport = new Schema({
  airport_name: {				// student_name
    type: String
  },
  airport_code: {				// student_email
    type: String
  },
  airport_address: {		// section
    type: String
  },
  hub_for: {						// subjects
    type: Array
  },
  airport_type: {				// gender
    type: String
  },
  date_opened: {				// dob
    type: Date
  }
}, {
  collection: 'airports'
})

module.exports = mongoose.model('Airport', Airport)