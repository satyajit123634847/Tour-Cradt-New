const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
    name: {
    type: String,
    
  },
  description: {
    type: String,
   
  },
  banner_img: {
    type: String,
   
  },

  status: {
    type: Boolean,
    default:true
  }
});


module.exports = mongoose.model('services', adminSchema);
