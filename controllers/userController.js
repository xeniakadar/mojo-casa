/* eslint-disable */
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs");

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
    .isLength({ min: 2 }).withMessage("Password must be at least 5 characters long")
    .escape()
    .matches('[0-9]').withMessage("Password must contain a number")
    .matches('[A-Z]').withMessage("Password must contain an uppercase letter"),

  asyncHandler( async(req, res, next) => {
    const errors = validationResult(req);
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: passwordHash,
      avatar: req.body.avatar,
    })

    if (!errors.isEmpty()) {
      console.log(errors)
      res.render("signup_form", {
        title: "Create a Profile",
        user,
        errors: errors.array(),
      });
      return;
    } else {
      const usernameExists = await User.findOne({ username: req.body.username}).exec();
      const emailExists = await User.findOne({ email: req.body.email}).exec();
      if (usernameExists || emailExists) {
        res.render("signup_form", {
          title: "Create a Profile",
          user,
          errors: [{msg: "Username or email already exists"}],
        })
        return;
      }
    }
    await user.save();
    res.redirect("/log-in");
      return next(err);
  })
];

exports.login_get = (req, res, next) => {
  res.render("login_form", {title: "Log in"});
}

exports.login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in"
});

exports.logout_get = (req, res, next) => {
  req.logout(function(err) {
    if (err) return next(err);
    res.redirect("/");
  });
};

exports.member_get = asyncHandler(async(req, res, next) => {
  res.render("member", {title: "Become a member", errorMessage:[]})
})

exports.member_post = asyncHandler(async(req, res, next) => {
  try {
    const { memberPassword, membership_status } = req.body;

    const passwordCorrect = (memberPassword === process.env.MEMBER_PASSWORD);

    if (!passwordCorrect) {
      return res.render("member", {
        title: "Become a member",
        errorMessage: "THAT'S NOT THE PASSWORD, INTRUDER"
      });
    }
    const user = await User.findById(req.user._id);

    if (user) {
      user.membership_status = !user.membership_status;
      await user.save();
      return res.redirect("/");
    } else {
      return res.render("member", {
        title: "Become a member",
        errorMessage: "User not found"
      })
    }
  } catch (err) {
    next(err);
  }
})
