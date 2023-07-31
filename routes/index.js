const express = require('express');
const router = express.Router();
const user_controller = require("../controllers/userController");
const passport = require("passport")
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



module.exports = router;
