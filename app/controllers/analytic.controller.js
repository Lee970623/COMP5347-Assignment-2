var model = require('../models/models')

// Global variables
var top_num = 2; // Top numbers used in overall analytics

/*-----------------------------------
    Overview analytics controllers
------------------------------------*/

// Top 2 edited articles with highest number of revisions
function topHighestRevision(req, res){
    var article, revision_num;

    //TODO: finish the controller


    return article, revision_num
}

// Top 2 edited articles with lowest number of revisions
function topLowestRevision(req, res){
    var article, revision_num
    //TODO:
    return article, revision_num
}

// Top 2 edited articles with largest number of users (non-bots)
function topLargestEdit(req, res){
    var article, group_size
    //TODO:
    return article, group_size
}

// Top 2 edited article with smallest number of users (non-bots)
function topSmallestEdit(req, res){
    var article, group_size
    //TODO:
    return article, group_size
}

// Top 2 longest history.
function topLongestHistory(req, res){
    var article, age

    //TODO:
    return article, age
}

// Top 2 shortest history
function topShortestHistory(req, res){
    var article, age

    //TODO:
    return article, age
}

function changeTopNumber(req, res){

}

module.exports = {
    topHighestRevision,
    topLowestRevision,
    topLargestEdit,
    topSmallestEdit,
    topLongestHistory,
    topShortestHistory,
    changeTopNumber
};