/* eslint-disable */
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// create a user
exports.signup_get = (req, res, next) => {
  res.render("signup_form", { title: "Create a Profile"});
};

// body("username")
//   .trim()
//   .isLength({ max: 25 })
//   .escape()
//   .withMessage("Username must be specified"),
// body("email")
//   .trim()
//   .escape()
//   .withMessage("Email must be specified"),
// body("password")
//   .trim()
//   .isLength({ min: 5 })
//   .escape()
//   .withMessage("Password must be specified"),

exports.signup_post =  async(req, res, next) => {
    try {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      })
      const result = await user.save();
      res.redirect("/");
    } catch(err) {
      return next(err);
    }
  }


// exports.user_create_post = {}
