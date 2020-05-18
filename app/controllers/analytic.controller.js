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
    const DAY_MILISEC = 1000 * 60 * 60 * 24;
    var returns = {
        "history": 0,
        "is_uptodate": false,
        "revisions": 0
    }

    // TODO: send query
    var current_time = new Date();
    var last_rev_time = new Date(result[0].time);
    if ((current_time - last_rev_time) / DAY_MILISEC > 1){
        returns.is_uptodate = false;
    } else{
        returns.is_uptodate = true;
    }

    res.send(returns);
}

// Update article`s revisions by calling Wikipedia`s API.
function updateArticle(req, res){
    let reqdata = req.body;
    const wiki_url = "https://en.wikipedia.org/w/api.php";
    // // Test case
    // var url = "https://en.wikipedia.org/w/api.php" +
    //     "?action=query&format=json&prop=revisions&titles=Australia&rvlimit=5&rvprop=timestamp|userid|user|ids"

    // TODO: send query

    // query result from model
    var result = {}

    var parameter = "action=query&format=json&prop=revisions&"+
        `titles=${reqdata.article}&rvstart=${result.last_date.toISOString()}`+
        "&revir=newer&rvprop=timestamp|userid|user|ids&rvlimit=max";

    var updated_list = [];
    request(url, function (error, response, data) {
        if(error){
            console.log(error)
        }else if(response.statusCode != 200){
            console.log(response.statusCode)
        }else {
            var pages = JSON.parse(data).query.pages
            var rev_list = pages[Object.keys(pages)[0]].revisions;
            if (rev_list.length > 0){
                for (let i=0; i< rev_list.length; i++){
                    var single_rev = rev_list[i]
                    var current_time = new Date();
                    var rev_time = new Date(single_rev.timestamp)

                    // Skip the same revision
                    if (single_rev.timestamp == result.last_date.toISOString()) {
                        continue;
                    }

                    // Build the revision data
                    var temp_rev = {
                        "title": reqdata.article,
                        "timestamp": single_rev.timestamp,
                        "revid": single_rev.revid,
                        "user": single_rev.user,
                        "userid": single_rev.userid,
                    }
                    updated_list.push(temp_rev)
                }
            }
        }
    });

    // TODO: call model to update revisions

    res.send({"updated_num": updated_list.length})
}

// Show the summary information for the selected article
function viewArticleSummary(req, res) {
    var reqdata = req.body;
    var returns = {
        "revision_num": 0,
        "top5_user": [],
        "top5_user_rev": []
    }

    // TODO: db query

    res.send(returns)
}

// Call Reddit API to get top 3 rated posts
function getRedditPosts(req, res) {
    var reqdata = req.body;
    var url = "https://www.reddit.com/r/news/search.json?q="
        + reqdata.title
        + "&restrict_sr=on&sort=top&t=all&limit=3"

    var returns = []

    request(url, function (error, response, data) {
        if(error){
            console.log(error)
        }else if(response.statusCode != 200){
            console.log(response.statusCode)
        }else {
            var posts = JSON.parse(response.body).data.children
            for (var s of posts){
                var temp = {
                    "title": s.data.title,
                    "url": s.data.url
                }
                returns.push(temp)
            }
        }
    });

    res.send(returns)
}

/*-----------------------------------
          Author analytics
------------------------------------*/

function viewArticleChangedByAuthor(req, res){
    var reqdata = req.body;
    var returns = [
        {
            "title": "",
            "timestamp": "",
            "revision_num": 0
        }
    ];

    //TODO: db query

    //TODO: build returns with query results

    res.send(returns)
}


module.exports = {
    viewOverall,
    viewDistribution,
    getArticleInfo,
    updateArticle,
    viewArticleSummary,
    getRedditPosts,
    viewArticleChangedByAuthor
};