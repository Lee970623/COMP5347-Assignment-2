var model = require('../models/models')
var request = require('request')

/*-----------------------------------
    Overview analytics
------------------------------------*/
function viewOverall(req, res){
    let reqdata = req.body;

    var querydata = {
        "topnum": reqdata["topnum"]
    }

    // TODO: multiple query request
    var returns = {
        "top_revision": {},
        "top_edit": {},
        "top_history": {}
    };

    res.send(returns)
}

// Send query to DB and get the distribution of users.
function viewDistribution(req, res){
    let reqdata = req.body;

    var querydata = {
        "usertype": "",
    }

    // TODO: db query
    var distribution_usertype = {
        "admin": 0,
        "bot": 0,
        "anonymous": 0,
        "registered": 0
    }

    var distribution_year = [
        {
            "year": "2001",
            "admin": 0,
            "bot": 0,
            "anonymous": 0,
            "registered": 0
        },
        {
            // TODO: generate json object from query result.
        }
    ]

    var returns = {
        "by_usertype": distribution_usertype,
        "by_year": distribution_year
    }
    res.send(returns)
}

/*-----------------------------------
    Individual article analytics
------------------------------------*/

function getArticleInfo(req, res){
    let reqdata = req.body;

    // TODO: send query

    var returns = {
        "history": 0,
        "is_uptodate": false,
        "revisions": 0
    }

    res.send(returns);
}

function updateArticle(req, res){
    let reqdata = req.body;
    var wiki_url = "https://en.wikipedia.org/w/api.php";
    var parameter = ""
    // TODO: call MediaWiki API

}


/*-----------------------------------
          Author analytics
------------------------------------*/

function viewArticleByAuthor(req, res){

}


module.exports = {
    viewOverall,
    viewDistribution,
    getArticleInfo,
    updateArticle,
    viewArticleByAuthor
};