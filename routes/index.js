const express = require('express');
const router = express.Router();
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mojo Dojo Casa House', user: req.user });
});

/* SIGNUP PAGE */
router.get("/sign-up", user_controller.signup_get);
router.post("/sign-up", user_controller.signup_post);

/* LOGIN PAGE */

router.get("/log-in", user_controller.login_get);
router.post("/log-in", user_controller.login_post);
router.get("/log-out", user_controller.logout_get);

/* MEMBER PAGE */

router.get("/member", user_controller.member_get);
router.post("/member", user_controller.member_post);

/* ADMIN PAGE */

router.get("/admin", user_controller.admin_get);
router.post("/admin", user_controller.admin_post);

/* Create message */

router.get("/create-message", message_controller.message_create_get);

module.exports = router;
