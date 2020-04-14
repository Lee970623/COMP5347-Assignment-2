var model = require('../models/models')
var crypto = require('crypto');

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

    console.log("[received data]" + JSON.stringify(req.body)) // Test line.

    //TODO: Send query to DB
    loginstat = true;
    req.session.loginStatus = loginstat;

    // Return data to ajax method so that success callback can execute.
    res.send({loginStatus: loginstat})
}

// User sign-up.
function signUp(req, res) {
    let regStat = false;

    console.log("[receive data]" + JSON.stringify(req.body));

    //TODO: Send query to DB
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