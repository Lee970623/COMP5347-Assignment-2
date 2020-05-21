var model = require('../models/models')
var request = require('request')

/*-----------------------------------
    Overview analytics
------------------------------------*/
async function viewOverall(req, res){
    let reqdata = req.query;

    var returns = {
        "top_revision": {},
        "top_edit": {},
        "top_history": {}
    };

    var limit = parseInt(reqdata.topnum); // TODO: parameter 'limit' -> variable 'limit'
    await model.revisions.findArticlesAndRevisionNumber(-1, limit).then((result)=>{
        returns.top_revision.highest = result
    });
    await model.revisions.findArticlesAndRevisionNumber(1, limit).then((result)=>{
        returns.top_revision.lowest = result
    });
    await model.revisions.findArticlesAndRevisionNumberFromRegisteredUsers(-1, limit).then((result)=>{
        returns.top_edit.largest = result
    });
    await model.revisions.findArticlesAndRevisionNumberFromRegisteredUsers(1, limit).then((result)=>{
        returns.top_edit.smallest = result
    });
    await model.revisions.findArticlesWithHistoryAndDuration(-1, limit).then((result)=>{
        returns.top_history.longest = result
    })
    await model.revisions.findArticlesWithHistoryAndDuration(1, limit).then((result)=>{
        returns.top_history.shortest = result
    })

    await res.send(returns)
}

// Send query to DB and get the distribution of users.
async function viewDistribution(req, res){
    var returns = {
        "by_usertype": [],
        "by_year": []
    }

    await model.revisions.getRevisionNumberByUserType().then((result)=>{
        returns.by_usertype = result
    });
    await model.revisions.getRevisionNumberByYearAndByUserType().then((result)=>{
        returns.by_year = result
    });

    await res.send(returns)
}

/*-----------------------------------
    Individual article analytics
------------------------------------*/

function getArticleInfo(req, res){
    let reqdata = req.query;
    const DAY_MILISEC = 1000 * 60 * 60 * 24;

    model.revisions.isArticleUpToDate(reqdata.article).then((result)=>{
        var current_time = new Date();
        var last_rev_time = new Date(result[0].timestamp);
        if ((current_time - last_rev_time) / DAY_MILISEC > 1){
            result.is_uptodate = false;
        } else{
            result.is_uptodate = true;
        }
        console.log("[query result]: "+JSON.stringify(result))
        return result
    }).then((result)=>{
        res.send(result)
    })
}

// Update article`s revisions by calling Wikipedia`s API.
function updateArticle(req, res){
    let reqdata = req.query;
    const wiki_url = "https://en.wikipedia.org/w/api.php";

    // // Test case
    // var url = "https://en.wikipedia.org/w/api.php" +
    //     "?action=query&format=json&prop=revisions&titles=Australia&rvlimit=5&rvprop=timestamp|userid|user|ids"

    var parameter = "action=query&format=json&prop=revisions&"+
        `titles=${reqdata.title}&rvstart=${reqdata.timestamp}`+
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
                        "user": single_rev.user,
                        "usertype": "regular"
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
    var reqdata = req.query;
    var returns = {
        "revision_num": 0,
        "top5_user": [],
        "top5_user_rev": []
    }

    // TODO: db query
    // TODO: regular users

    res.send(returns)
}

// Call Reddit API to get top 3 rated posts
function getRedditPosts(req, res) {
    var reqdata = req.query;
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
    var reqdata = req.query;
    var returns = [
        {
            "title": "",
            "timestamps": [], // Timestamps of all revisions for this article
            "revision_num": 0
        }
    ];

    //TODO: db query
    var result;

    for (var ec of result){

    }
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