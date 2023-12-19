const bcrypt = require("bcryptjs");
const adminUsers = require("../../model/admin/adminUser.model");
const locationModel = require("../../model/admin/location.model");
const packagesModel = require("../../model/admin/packages.model");
const servicesModel = require("../../model/admin/services.model");
const destinationModel = require("../../model/admin/destination.model");

const jwt = require("jsonwebtoken");

// ---------register---------------------//
exports.register = async (req, res) => {
  console.log(req.body);

  const { username, password, name, mobile_number, email, user_status, sign } =
    req.body;
  const existingUser = await adminUsers.findOne({
    username: username,
    status: true,
  });
  if (existingUser) {
    return res.json({
      status: false,
      message: "Username already exists",
    });
  }
  new adminUsers({
    username,
    password,
    name,
    mobile_number,
    email,
    user_status,
    sign,
  })
    .save()
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "User register successfully..!",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// ---------login ----------------------//
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const adminUser = await adminUsers.findOne({
    username: username,
    status: true,
  });
  if (!adminUser) {
    return res.json({
      status: false,
      message: "Invalid username or password",
    });
  }
  const isMatch = await bcrypt.compare(password, adminUser.password);
  if (!isMatch) {
    return res.json({
      status: false,
      message: "Invalid username or password",
    });
  }
  const token = jwt.sign({ userId: adminUser._id }, "secret-key", {
    expiresIn: "1d",
  });

  return res.json({
    status: true,
    data: adminUser,
    message: "User login successfully..!",
    token: token,
  });
};

// ----------list all admin-------------//
exports.list_admin = async (req, res) => {
  adminUsers
    .find({ status: true })
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "admin list",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// ----------update_admin---------------//
exports.update_admin = async (req, res) => {
  const { username, name, mobile_number, email, user_status, password, sign } =
    req.body;

  var data = await adminUsers.findById({ _id: req.params.id });
  var query = null;
  if (data.password === password) {
    query = { username, name, mobile_number, email, user_status, sign };
  } else {
    query = {
      username,
      name,
      mobile_number,
      email,
      user_status,
      password,
      sign,
    };
  }
  adminUsers
    .findByIdAndUpdate({ _id: req.params.id }, query)
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "Record update successfully..!",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// ----reset_password-----------//
exports.reset_password = async (req, res) => {
  const { password, admin_id } = req.body;

  var query = null;

  query = { password };

  adminUsers
    .findByIdAndUpdate({ _id: admin_id }, query)
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "Password reset successfully..!",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// -----------delete_admin------------//
exports.delete_admin = async (req, res) => {
  adminUsers
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        status: false,
      }
    )
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "Record delete successfully..!",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// ----------list all admin-------------//
exports.list_admin_by_role = async (req, res) => {
  adminUsers
    .find({ status: true, user_status: req.params.id })
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "admin list",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// ---------add_location---------------------//
exports.add_location = async (req, res) => {
  const { location_name, country_name } = req.body;
  const existingUser = await locationModel.findOne({
    location_name: location_name,
    status: true,
  });
  if (existingUser) {
    return res.json({
      status: false,
      message: "Location name already exists",
    });
  }
  new locationModel({ location_name, country_name })
    .save()
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "Location register successfully..!",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// ----------list_location -------------//
exports.list_location = async (req, res) => {
  locationModel
    .find({ status: true })
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "Location list",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// ----------update_location---------------//
exports.update_location = async (req, res) => {
  const { location_name, country_name } = req.body;

  locationModel
    .findByIdAndUpdate({ _id: req.params.id }, { location_name, country_name })
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "Record update successfully..!",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// -----------delete_location------------//
exports.delete_location = async (req, res) => {
  locationModel
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        status: false,
      }
    )
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "Record delete successfully..!",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// ----------list_packages_admin -------------//
exports.list_location_admin = async (req, res) => {
  locationModel
    .find({})
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "Location list",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// ----------list_location_by_country -------------//
exports.list_location_by_country = async (req, res) => {
  try {
    const data = await locationModel.aggregate([
      {
        $match: { status: true },
      },
      {
        $group: {
          _id: "$country_name",
          locations: { $push: "$location_name" },
        },
      },
      {
        $project: {
          country_name: "$_id",
          locations: 1,
          _id: 0,
        },
      },
    ]);

    return res.json({
      status: true,
      data: data,
      message: "Location list grouped by country",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: false,
      data: err,
      message: "Something went wrong...!",
    });
  }
};

// ---------add_packages---------------------//
exports.add_packages = async (req, res) => {
  const {
    name,
    tour_type,
    group_size,
    banner_img,
    packages_imgs,
    days,
    location_id,
    price,

  } = req.body;
  const existingUser = await packagesModel.findOne({
    name: name,
    status: true,
  });
  if (existingUser) {
    return res.json({
      status: false,
      message: "Packages already exists",
    });
  }

  var days_count = days.length;
  new packagesModel({
    name,
    tour_type,
    group_size,
    banner_img,
    packages_imgs,
    days,
    location_id,
    price,
    days_count
  })
    .save()
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "Packages register successfully..!",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// ----------list_packages -------------//
exports.list_packages = async (req, res) => {
  packagesModel
    .find({ status: true })
    .populate("location_id")
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "packages list",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

exports.list_packages_by_name = async (req, res) => {
  console.log(req.params.name);

  packagesModel
    .find({ name: req.params.name, status: true })
    .populate("location_id")
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "packages list",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// ----------update_packages---------------//
exports.update_packages = async (req, res) => {
  const {
    name,
    tour_type,
    group_size,
    banner_img,
    packages_imgs,
    days,
    location_id,
    price,
  } = req.body;

  var days_count = days.length;
  packagesModel
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        name,
        tour_type,
        group_size,
        banner_img,
        packages_imgs,
        days,
        location_id,
        price,
        days_count
      }
    )
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "Record update successfully..!",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// -----------delete_packages------------//
exports.delete_packages = async (req, res) => {
  packagesModel
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        status: false,
      }
    )
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "Record delete successfully..!",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// ----------list_packages_admin -------------//
exports.list_packages_admin = async (req, res) => {
  packagesModel
    .find({})
    .populate("location_id")
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "Location list",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// --------filter_packages-----------//
exports.filter_packages = async (req, res) => {
  var query = {};
  console.log(req.body);

  if (req.body.location_id != "0" && req.body.duration == "0") {
    query = { location_id: req.body.location_id, status: true };
  } else if (req.body.location_id == "0" && req.body.duration != "0") {
    var rang_from = 0
    var rang_to = 0

    if (req.body.duration == "1") {
      rang_from = 1
      rang_to = 2
    } else if (req.body.duration == "2") {
      rang_from = 2
      rang_to = 5
    } else if (req.body.duration == "3") {
      rang_from = 5
      rang_to = 10
    } else if (req.body.duration == "4") {
      rang_from = 10
      rang_to = 15
    }

    query = { days_count: { $gte: rang_from, $lte: rang_to }, status: true };
  }else{
    var rang_from = 0
    var rang_to = 0

    if (req.body.duration == "1") {
      rang_from = 1
      rang_to = 2
    } else if (req.body.duration == "2") {
      rang_from = 2
      rang_to = 5
    } else if (req.body.duration == "3") {
      rang_from = 5
      rang_to = 10
    } else if (req.body.duration == "4") {
      rang_from = 10
      rang_to = 15
    }
    query = { location_id: req.body.location_id, status: true , days_count: { $gte: rang_from, $lte: rang_to }};
  }
  packagesModel
    .find(query)
    .populate("location_id")
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "Location list",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// -----list_packages_country--------//
exports.list_packages_country = async (req, res) => {
  try {
    const data = await packagesModel.aggregate([
      {
        $lookup: {
          from: "locations",
          localField: "location_id",
          foreignField: "_id",
          as: "location",
        },
      },
      {
        $unwind: "$location", // unwind the location array
      },
      {
        $match: {
          status: true,
          "location.country_name": req.params.name,
        },
      },
    ]);

    return res.json({
      status: true,
      data: data,
      message: "Destination list grouped by country with project count",
    });
  } catch (err) {
    return res.json({
      status: false,
      data: err,
      message: "Something went wrong...!",
    });
  }
};


// ---------add_services---------------------//
exports.add_services = async (req, res) => {
  const { name, description, banner_img } = req.body;
  const existingUser = await servicesModel.findOne({
    name: name,
    status: true,
  });
  if (existingUser) {
    return res.json({
      status: false,
      message: "services already exists",
    });
  }
  new servicesModel({ name, description, banner_img })
    .save()
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "services register successfully..!",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// ----------list_services -------------//
exports.list_services = async (req, res) => {
  servicesModel
    .find({ status: true })
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "services list",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// ----------update_services---------------//
exports.update_services = async (req, res) => {
  const { name, description, banner_img } = req.body;

  servicesModel
    .findByIdAndUpdate(
      { _id: req.params.id },
      { name, description, banner_img }
    )
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "Record update successfully..!",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// -----------delete_services------------//
exports.delete_services = async (req, res) => {
  servicesModel
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        status: false,
      }
    )
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "Record delete successfully..!",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// ----------list_services_admin -------------//
exports.list_services_admin = async (req, res) => {
  servicesModel
    .find({})
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "Location list",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

exports.send_msg = async (req, res) => {
  const twilio = require("twilio");

  // Replace these values with your Twilio credentials and Twilio phone number
  const accountSid = "ACadb7424cea6ebc4fe55c520cd0103167";
  const authToken = "e7915824e41c46425776ee75973b67d4";
  const twilioPhoneNumber = "whatsapp:+14155238886"; // Replace with your Twilio phone number

  const client = new twilio(accountSid, authToken);

  const recipientPhoneNumber = "whatsapp:+8459842851"; // Replace with the recipient's phone number

  const messageOptions = {
    from: twilioPhoneNumber,
    to: recipientPhoneNumber,
    body: "Hello, this is a normal WhatsApp message!",
  };

  // Send the WhatsApp message
  client.messages
    .create(messageOptions)
    .then((message) => {
      console.log("Message sent successfully:", message.sid);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
};

// ---------add_destination---------------------//
exports.add_destination = async (req, res) => {
  const { name, description, banner_img, country_name } = req.body;
  const existingUser = await destinationModel.findOne({
    name: name,
    status: true,
  });
  if (existingUser) {
    return res.json({
      status: false,
      message: "Destination already exists",
    });
  }
  new destinationModel({ name, description, banner_img, country_name })
    .save()
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "services register successfully..!",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// ----------list_destination -------------//
exports.list_destination = async (req, res) => {
  try {
    const data = await destinationModel.aggregate([
      {
        $match: { status: true },
      },
      // {
      //   $lookup: {
      //     from: "packages",
      //     localField: "country_name",
      //     foreignField: "country_name",
      //     as: "packages",
      //   },
      // },
      // {
      //   $lookup: {
      //     from: "locations",
      //     localField: "packages.location_id",
      //     foreignField: "country_name",
      //     as: "packages",
      //   },
      // },
      // {
      //   $group: {
      //     _id: "$country_name",
      //     projectCount: { $sum: 1 },
      //   },
      // },
    ]);

    return res.json({
      status: true,
      data: data,
      message: "Destination list grouped by country with project count",
    });
  } catch (err) {
    return res.json({
      status: false,
      data: err,
      message: "Something went wrong...!",
    });
  }
};

// ----------update_destination---------------//
exports.update_destination = async (req, res) => {
  const { name, description, banner_img, country_name } = req.body;

  destinationModel
    .findByIdAndUpdate(
      { _id: req.params.id },
      { name, description, banner_img, country_name }
    )
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "Record update successfully..!",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// -----------delete_destination------------//
exports.delete_destination = async (req, res) => {
  destinationModel
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        status: false,
      }
    )
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "Record delete successfully..!",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};

// ----------list_destination_admin -------------//
exports.list_destination_admin = async (req, res) => {
  destinationModel
    .find({})
    .then((data) => {
      return res.json({
        status: true,
        data: data,
        message: "destination list",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: false,
        data: err,
        message: "Somethings went wrong...!",
      });
    });
};
