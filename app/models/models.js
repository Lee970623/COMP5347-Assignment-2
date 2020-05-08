var db = require('./db.js');
var fs = require('fs');
var readline = require('readline');

//User schema for storing and varifing user infomation
var userSchema = db.Schema({
        emailAddress: {
        type: String,
        required: true,
        unique: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        securityQuesion: {
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
    },
    {
        versionKey: false
    })

//User sign up
userSchema.statics.signUp = function(signUpData){
    var newUser = {
        emailAddress: signUpData.email,
        firstName: signUpData.firstname,
        lastName: signUpData.lastname,
        securityQuesion: signUpData.question,
        answerForSecurityQuestion: signUpData.answer,
        password: signUpData.pwd
    }
    return this.insertOne(newUser);
}

//User sign in
userSchema.statics.signIn = function(signInData){
    var user = {
        emailAddress: signInData.email,
        password: signInData.pwd
    }
    console.log(this.find(user).exec());
    return this.find(user).exec();
}

//User reset the PWD
userSchema.statics.resetPWD = function(resetData){
    var user = {
        emailAddress: resetData.email,
        securityQuesion: resetData.question,
        answerForSecurityQuestion: resetData.answer,
        password: resetData.old_pwd
    }
    return this.find(user).update({$set:{password: resetData.new_pwd}});
}

var user = db.model('User',userSchema,'users');

//Wiki_pedia user schema
var botUserSchema = new db.Schema(
    {
        user: String,
        usertype: String
    },
    {
        versionKey: false
    }
);

var botUser = db.model('BotUser', botUserSchema)


var adminUserSchema = db.Schema(
    {
        user: String,
        usertype: String
    },
    {
        versionKey: false
    }
);

var adminUser = db.model('AdminUser', adminUserSchema)

function addTextToModel(model, text, type){
    const fileStream = fs.createReadStream(text);

    const rl = readline.createInterface({
        input: fileStream,
        console: false
    })

    rl.on('line',function(line){
        //console.log(line);
        model.create(JSON.parse("{\"user\" :\"" + line.toString() + "\"," +
        "\"usertype\" :\"" + type.toString() + "\"}" ));
    })
}

addTextToModel(botUser, "../../public/data/Dataset_22_March_2020/bots.txt", "bot")
addTextToModel(adminUser, "../../public/data/Dataset_22_March_2020/administrators.txt", "admin")

//Revision Schema for revision record
var revisionSchema = new db.Schema(
    {
        anon: Boolean,
        user: String,
        timestamp: String,
        title: String,
        usertype: String,
        date: Date
    },
    {
        versionKey: false
    }
);
//Overall Analytics
// The top two articles with the highest number of revisions and their number of revisions.
// The top two articles with the lowest number of revisions and their number of revisions.
revisionSchema.statics.findArticlesAndRevisionNumber = function(direction = 1, limits = 2, callback){
    pipeline = [
        {
            $group : { _id : "$title", count : {$sum: 1}}
        },
        {
            $sort : {count : direction}
        },
        {
            $limit : limits
        }
    ]
    return this.aggregate(pipeline).exec(callback);
}
// The top two articles edited by the largest group of registered users (non bots) and their group size. 
// Each wiki article is edited by a number of users, some making multiple revisions. 
// The number of unique users is a good indicator of an article’s popularity.
// The top two articles edited by the smallest group of registered users and their group size.
revisionSchema.statics.findArticlesAndRevisionNumberFromRegisteredUsers = function(direction = 1, limits = 2, callback){
    pipeline = [
        {
            $match:{usertype:"registered"}
        },
        {
            $group:{
                _id:{title:"$title"},
                count:{$sum:1}
            }
        },
        {
            $sort:{count:direction}
        },
        {
            $limit: limits
        }
    ]
    return this.aggregate(pipeline).exec(callback);
}



// The top two articles with the longest history (measured by age) and and their age (in days). 
// For each article, the revision with the smallest timestamp is the first revision,
// indicating the article’s creation time.
// An article’s age is the duration between now and the article's creation time.
// The top two articles with the shortest history (measured by age) and their age (in days).
revisionSchema.statics.findArticlesWithHistoryAndDuration = function(direction = 1, limits = 2, callback){
    pipeline = [
        {
            $group : {
                _id: {title: "$title"}, 
                createdTime:{$min: "$date"}
            }
        },
        {
            $sort:{createdTime: direction}
        },
        {
            $limit: limits
        },
        {
            $project:{
                title: "$title",
                daysince : { $trunc:
                        {$divide: [{$subtract:[new Date(), "$date"]}, 1000*60*60*24]}
                }
            }
        }
    ]
    return this.aggregate(pipeline).exec(callback);
}
// The user should be provided with a way to change the number of top articles shown, e.g. for highest and lowest number of revisions. The selected number should be applied to all categories above


//Individual Article Analytics

var revisions = db.model("Revision",revisionSchema);

function readTextAndUpdateUsertypeForRevison(file, type){
    const fileStream = fs.createReadStream(file);

    const rl = readline.createInterface({
        input: fileStream,
        console: false
    })

    rl.on('line',function(line){
        //console.log(line);
        let username = line.trim();
        revisions.updateMany(
            {user:username},
            {$set:{usertype:type}},
            {multi:true}
            ).exec(function(err){
                if(err){
                    console.log(err)
                }
            })
    })
}

readTextAndUpdateUsertypeForRevison("../../public/data/Dataset_22_March_2020/bots.txt", "bot")
readTextAndUpdateUsertypeForRevison("../../public/data/Dataset_22_March_2020/administrators.txt", "administrator")

revisions.updateMany(
    {anon:{$exists:true}},
    { $set:{"usertype":"anonymous"}},
    function(err){
      if(err){
        console.error(err)
      }
    })

revisions.updateMany(
    { usertype:{$exists:false}},
    { $set:{"usertype":"regular"}},
    function(err){
      if(err){
        console.error(err)
      }
    })

revisions.updateMany(
    {},
    [
    {
        $set:
        {
            "date":
            {
                $dateFromString :{ dateString: "$timestamp"}
            }
        }
    },
    // {
    //     $unset : ["timestamp","revid","parentid","minor","userid","size","sha1","parsedocument"]
    // }
    // ],
    function(err){
        if(err){
            console.error(err)
        }
    }
)



module.exports = {user,revisions};
//***Test***
// var test = db.connection;
// test.on('error',console.error.bind(console,'connection error: '));
// test.once('open', function(){
//     // var input = {
//     //     'email': "test@1234.com",
//     //     'firstname': "Test",
//     //     'lastname': "Test",
//     //     'question': "Test Answer",
//     //     'pwd': "123456"
//     //     }

//     // user.signUp(input);
//     // user.signIn(input);
//     //updateUsertypeForRevison(botUser,adminUser,revisions);
// })