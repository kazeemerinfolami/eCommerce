const Ecommerce = require("../models/models");
const bodyParser = require("body-parser");

exports.signup = (req, res) => {
  console.log("req.body", req.body);
  const user = new Ecommerce(bodyParser);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error,
      });
    }
    res.json({
      user,
    });
  });
};
