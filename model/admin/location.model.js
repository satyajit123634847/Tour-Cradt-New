const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
    location_name: {
    type: String,
    required: true,
    // unique: true
  },
  country_name: {
    type: String,
    required: true,
    // unique: true
  },

  status: {
    type: Boolean,
    default:true
  }
});


module.exports = mongoose.model('location', adminSchema);
