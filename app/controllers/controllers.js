// show login page
function showLoginPage(req, res) {
    res.render("index.ejs");
}

function resetPwd(req, res) {
    res.render("reset.ejs");
}

// user login
// function signIn(req, res)

// user register
// function signUp(req, res)


// exports
module.exports = { showLoginPage, resetPwd }