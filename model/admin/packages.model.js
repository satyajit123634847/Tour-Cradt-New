const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // unique: true
  },
  tour_type: {
    type: String,
    required: true,
    // unique: true
  },
  group_size: {
    type: String,
  },
  price: {
    type: String,
    default:""
  },
  banner_img: {
    type: String,
  },
  packages_imgs: {
    type: [],
  },
  location_id:{
    type: mongoose.Types.ObjectId,
      ref: "location",
      default:null

  },
  days: [
    {
      name: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],

  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("packages", adminSchema);
