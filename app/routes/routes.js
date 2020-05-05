var express = require('express')
var index_controller = require('../controllers/index.controller.js')
var analytic_controller = require('../controllers/analytic.controller')
var router = express.Router()

// Login/Signup page contollers
router.get('/', index_controller.showLoginPage);
router.post('/signin', index_controller.signIn);
router.post('/signup', index_controller.signUp);
router.get('/reset', index_controller.resetPwd);
router.post('/valreset', index_controller.validateResetPwd);
router.get('/logout', index_controller.logOut);
router.get('/main', index_controller.mainPageTest);

// Analytic page controllers
router.get('/analytic/changetopnum', analytic_controller.changeTopNumber);
router.get('/analytic/tophighestrevision', analytic_controller.topHighestRevision);
//TODO: rest of the controllers

module.exports = router;