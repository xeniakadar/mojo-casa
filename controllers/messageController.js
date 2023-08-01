const { locals } = require("../app");
const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// exports.index = asyncHandler(async (req, res, next) => {
//   const allPosts = await Message.find({}, "title text date username")
//     .sort({ date: -1})
//     .exec();
//   res.render("posts", { title: ""})
//   //make it so that the posts render on "/" while the stuff that used to be
// })

exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.render("create_message_form", { title: "Create Message", errors: []});
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
      userid: req.user._id,
      time_stamp: Date.now(),
    });

    if (!errors.isEmpty()) {
      console.log(errors);
      res.render("create_message_form", {
        title: "Create Message",
        errors: errors.array(),
      });
    } else {
      await message.save();
      res.redirect("/");
    }
  }),
];
