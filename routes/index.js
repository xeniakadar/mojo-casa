const express = require('express');
const router = express.Router();
const user_controller = require("../controllers/userController");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mojo Dojo Casa House' });
});

// * SIGNUP PAGE *
router.get("/sign-up", user_controller.signup_get);

router.post("/sign-up", user_controller.signup_post);

module.exports = router;
