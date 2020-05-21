$(document).ready(function () {
    $("#numOfTitle").click(viewAnalytics);
});

// Change the top number displayed by analytics.
function viewAnalytics() {
    var num = parseInt($("#titlenum").val());
    var formdata = {"topnum": num};

    $.ajax({
        type: "GET",
        url: "/analytic/view_overall",
        dataType: "JSON",
        data: num,
        success: function (res) {
            fillTableRevision(res.top_revision, num);
            fillTableEdit(res.top_edit, num);
            fillTableHistory(res.top_history, num);
        },
        error: function (xhr) {
            M.toast({html: "Error in viewAnalytics: " + xhr.status + " " + xhr.statusText})
        }
    });
}

function fillTableRevision(res, num) {
    var table_head = "<table class=''><thead>" +
        "<tr><th>Article</th><th>Num of revisions</th></tr></thead><tbody>"
    var table_end = "</tbody></table>"
    var table_row = ""

    var highest_articles = res.highest["_id"];
    var highest_revisions = res.highest["count"];
    var lowest_articles = res.lowest["_id"];
    var lowest_revisions = res.lowest["count"];

    // Build HTML elements and append to the page.
    for (var i=0; i < num; i++){
        table_row += `<tr><td>${highest_articles[i]}</td><td>${highest_revisions[i]}</td></tr>`
    }
    $("#highestRev tbody").empty();
    $("#highestRev tbody").append(table_head + table_row + table_end);

    table_row = ""; // Clear the string
    for (i=0; i<num; i++){
        table_row += `<tr><td>${lowest_articles[i]}</td><td>${lowest_revisions[i]}</td></tr>`
    }
    $("#lowestRev tbody").empty();
    $("#lowestRev tbody").append(table_head + table_row + table_end)
}

function fillTableEdit(res, num) {
    var table_head = "<table class=''><thead>" +
        "<tr><th>Article</th><th>Num of edits</th></tr></thead><tbody>"
    var table_end = "</tbody></table>"
    var table_row = ""

    var largest_articles = res.largest["_id"];
    var largest_edits = res.largest["count"];
    var smallest_articles = res.smallest["_id"];
    var smallest_edits = res.smallest["count"];

    // Build HTML elements and append to the page.
    for (var i=0; i < num; i++){
        table_row += `<tr><td>${largest_articles[i]}</td><td>${largest_edits[i]}</td></tr>`
    }
    $("#largestGroup tbody").empty();
    $("#largestGroup tbody").append(table_head + table_row + table_end);

    table_row = ""; // Clear the string
    for (i=0; i<num; i++){
        table_row += `<tr><td>${smallest_articles[i]}</td><td>${smallest_edits[i]}</td></tr>`
    }
    $("#smallestGroup tbody").empty();
    $("#smallestGroup tbody").append(table_head + table_row + table_end)
}

function fillTableHistory(res, num) {
    var table_head = "<table class=''><thead>" +
        "<tr><th>Article</th><th>Num of history</th></tr></thead><tbody>"
    var table_end = "</tbody></table>"
    var table_row = ""

    var longest_articles = res.longest["_id"];
    var longest_history = res.longest["daysSinceCreatedTime"];
    var shortest_articles = res.shortest["_id"];
    var shortest_history = res.shortest["daysSinceCreatedTime"];

    // Build HTML elements and append to the page.
    for (var i=0; i < num; i++){
        table_row += `<tr><td>${longest_articles[i]}</td><td>${longest_history[i]}</td></tr>`
    }
    $("#longestAge tbody").empty();
    $("#longestAge tbody").append(table_head + table_row + table_end);

    table_row = ""; // Clear the string
    for (i=0; i<num; i++){
        table_row += `<tr><td>${shortest_articles[i]}</td><td>${shortest_history[i]}</td></tr>`
    }
    $("#shortestAge tbody").empty();
    $("#shortestAge tbody").append(table_head + table_row + table_end)
}

// Get data from DB and display as charts.
function chartSummary() {
    $.ajax({
        type: "GET",
        url: "/analytic/view_charts",
        dataType: "JSON",
        success: function (res) {
            //TODO: fill charts
        },
        error: function (xhr) {
            M.toast({html: "Error in chartSummary: " + xhr.status + " " + xhr.statusText})
        }
    }).done(function () {
        //TODO: operation goes here
    })
}