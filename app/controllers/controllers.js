var model = require('../models/models')
var crypto = require('crypto');
var md5 = crypto.createHash('md5');

// show login page
function showLoginPage(req, res) {
    res.render("index.ejs");
}

function resetPwd(req, res) {
    res.render("reset.ejs");
}

// User sign-in.
function signIn(req, res) {
    let loginstat = false;
    var reqdata = req.body;

    console.log("[received data]" + JSON.stringify(reqdata)) // Test line.

    // TODO: Send query to DB, then execute tht code below
    var userdata = {
        email: reqdata["email"],
        pwd: md5.update(reqdata["password"], 'utf8').digest('hex')
    }

    loginstat = true;
    req.session.loginStatus = loginstat;

    // Return data to ajax method so that success callback can execute.
    res.send({loginStatus: loginstat})
}

// User sign-up.
function signUp(req, res) {
    let regStat = false;
    var reqdata = req.body;

    console.log("[received data]" + JSON.stringify(reqdata)) // Test line.

    // TODO: Send query to DB, then execute tht code below
    var userdata = {
        email: reqdata["email"],
        pwd: md5.update(reqdata["password"], 'utf8').digest('hex'),
        firstname: reqdata["firstname"],
        lastname: reqdata["lastname"],
        question: reqdata["question"],
        answer: reqdata["question"]
    }

    regStat = true;
    req.session.loginStatus = regStat;
    res.send({registerStatus: regStat})
}


// Test main page
function mainPageTest(req, res) {
    res.render("main.ejs");
}

// exports
module.exports = {showLoginPage, resetPwd, signIn, signUp, mainPageTest};