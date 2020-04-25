var db = require('./db.js');

//User schema for storing and varifing user infomation
var userSchema = db.Schema({
    emailAddress: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    answerForSecurityQuestion: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

//User sign up
userSchema.statics.signUp = function(signUpData){
    var newUser = {
        'emailAddress': signUpData.email,
        'firstName': signUpData.firstname,
        'lastName': signUpData.lastname,
        'answerForSecurityQuestion': signUpData.question,
        'password': signUpData.pwd
    }
    return this.create(newUser)
}

//User sign in
userSchema.statics.signIn = function(signInData){
    var user = {
        'emailAddress': signInData.email,
        'password': signInData.pwd
    }
    console.log(this.find(user).exec());
    return this.find(user).exec();
}

var user = db.model('User',userSchema,'users');
module.exports = user;
//***Test***
// var test = db.connection;
// test.on('error',console.error.bind(console,'connection error: '));
// test.once('open', function(){
//     var input = {
//         'email': "test@1234.com",
//         'firstname': "Test",
//         'lastname': "Test",
//         'question': "Test Answer",
//         'pwd': "123456"
//         }
//
//     user.signUp(input);
//     user.signIn(input);
// })

