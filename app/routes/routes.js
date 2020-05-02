var express = require('express')
var controller = require('../controllers/controllers.js')
var router = express.Router()

router.get('/', controller.showLoginPage);
router.post('/signin', controller.signIn);
router.post('/signup', controller.signUp);
router.get('/reset', controller.resetPwd);
router.post('/valreset', controller.validateResetPwd);
router.get('/main', controller.mainPageTest);
router.get('/logout', controller.logOut);

module.exports = router;