const { locals } = require("../app");
const moment = require("moment");
const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find({}, "title text time_stamp username avatar")
    .sort({ time_stamp: -1 })
    .populate("text")
    .exec();
  res.render('index', { title: 'Mojo Dojo Casa House', user: req.user, messages: allMessages });
})

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
      username: req.user.username,
      time_stamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
      avatar: req.user.avatar,
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

exports.message_delete_post = asyncHandler(async (req, res, next) => {
  await Message.findByIdAndRemove(req.params.id);
  res.redirect("/");
});
