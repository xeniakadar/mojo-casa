/* eslint-disable */
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// create a user
exports.signup_get = (req, res, next) => {
  res.render("signup_form", { title: "Create a Profile", errors: []});
};

exports.signup_post = [
  body("username", "Username must be specified")
    .trim()
    .isLength({ max: 25 })
    .escape(),
    // .withMessage("Username must be specified"),
  body("email")
    .trim()
    .escape()
    .isEmail().withMessage("Email must be specified"),
  body("password", "Password must be specified")
    .trim()
    .isLength({ min: 5 }).withMessage("Password must be at least 5 characters long")
    .escape()
    .matches('[0-9]').withMessage("Password must contain a number")
    .matches('[A-Z]').withMessage("Password must contain an uppercase letter"),

  asyncHandler( async(req, res, next) => {
    const errors = validationResult(req);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      avatar: req.body.avatar,
    })

    if (!errors.isEmpty()) {
      console.log(errors)
      res.render("signup_form", {
        title: "TRY AGAIN: Create a Profile",
        user,
        errors: errors.array(),
      });
      return;
    }
    await user.save();
    res.redirect("/");
      return next(err);
  })
];

exports.login_get = (req, res, next) => {
  res.render("login_form", {title: "Log in", errors: []});
}

exports.login_post = (req, res, next) => {
  res.render()
}
exports.logout_get = (req, res, next) => {
  res.render()
}

//Finish login situation here
//figure out if we need passport here as well
//make a login_form in views



// exports.user_create_post = {}