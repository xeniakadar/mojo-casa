const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.render("create_message_form", { title: "Create Message" });
});

exports.message_create_post = [
  body("title", "Title must be specified")
    .trim()
    .isLength({ max: 30 })
    .escape(),
  body("text", "Your message must be at least 5 characters long")
    .trim()
    .isLength({ min: 5 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      //figure out if I need to add date and name here I think:
      user: req.params.user._id,
      time_stamp: //time stamp
    })
  })
]
