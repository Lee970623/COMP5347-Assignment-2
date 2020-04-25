var db = require('./db.js');

//User schema for storing and varifing user infomation
var userSchema = db.Schema({
    emailAddress: {
        type: String,
        required: true
    },
    userName:{
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

//User sing up
userSchema.statics.singUp = function(singUpData){
    var newUser = {
        'emailAddress': singUpData.email,
        'userName': singUpData.email,
        'firstName': singUpData.firstname,
        'lastName': singUpData.lastname,
        'answerForSecurityQuestion': singUpData.question,
        'password': singUpData.pwd
    }
    return this.create(newUser)
}

//User sing in
userSchema.statics.singIn = function(singInData){
    var user = {
        'userName': singInData.email,
        'password': singInData.pwd
    }
    console.log(this.find(user).exec());
    return this.find(user).exec();
}

var user = db.model('User',userSchema,'users');

//***Test***
var test = db.connection;
test.on('error',console.error.bind(console,'connection error: '));
test.once('open', function(){
    var input = {
        'email': "test@1234.com",
        'firstname': "Test",
        'lastname': "Test",
        'question': "Test Answer",
        'pwd': "123456"
        }

    user.singUp(input);
    user.singIn(input);
})

module.exports = user;