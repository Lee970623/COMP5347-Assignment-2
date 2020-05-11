$(document).ready(function () {
    $("#viewanalytics").click(viewAnalytics);
});

// Change the top number displayed by analytics.
function viewAnalytics() {
    var num = parseInt($("#topnum_input").val());
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
            M.toast({html: "Error: " + xhr.status + " " + xhr.statusText})
        }
    });
}

function fillTableRevision(res, num) {
    var table_head = "<table class=''><thead>" +
        "<tr><th>Article</th><th>Num of revisions</th></tr></thead><tbody>"
    var table_end = "</tbody></table>"
    var table_row = ""

    var highest_articles = res.highest["articles"];
    var highest_revisions = res.highest["revisions"];
    var lowest_articles = res.lowest["articles"];
    var lowest_revisions = res.lowest["revisions"];

    // Build HTML elements and append to the page.
    for (var i=0; i < num; i++){
        table_row += `<tr><td>${highest_articles[i]}</td><td>${highest_revisions[i]}</td></tr>`
    }
    $("#highestrevisions tbody").empty();
    $("#highestrevisions tbody").append(table_head + table_row + table_end);

    table_row = ""; // Clear the string
    for (i=0; i<num; i++){
        table_row += `<tr><td>${lowest_articles[i]}</td><td>${lowest_revisions[i]}</td></tr>`
    }
    $("#lowestrevisions tbody").empty();
    $("#lowestrevisions tbody").append(table_head + table_row + table_end)
}

function fillTableEdit(res, num) {
    var table_head = "<table class=''><thead>" +
        "<tr><th>Article</th><th>Num of edits</th></tr></thead><tbody>"
    var table_end = "</tbody></table>"
    var table_row = ""

    var largest_articles = res.largest["articles"];
    var largest_edits = res.largest["edits"];
    var smallest_articles = res.smallest["articles"];
    var smallest_edits = res.smallest["edits"];

    // Build HTML elements and append to the page.
    for (var i=0; i < num; i++){
        table_row += `<tr><td>${largest_articles[i]}</td><td>${largest_edits[i]}</td></tr>`
    }
    $("#largestedits tbody").empty();
    $("#largestedits tbody").append(table_head + table_row + table_end);

    table_row = ""; // Clear the string
    for (i=0; i<num; i++){
        table_row += `<tr><td>${smallest_articles[i]}</td><td>${smallest_edits[i]}</td></tr>`
    }
    $("#smallestedits tbody").empty();
    $("#smallestedits tbody").append(table_head + table_row + table_end)
}

function fillTableHistory(res, num) {
    var table_head = "<table class=''><thead>" +
        "<tr><th>Article</th><th>Num of history</th></tr></thead><tbody>"
    var table_end = "</tbody></table>"
    var table_row = ""

    var longest_articles = res.longest["articles"];
    var longest_history = res.longest["history"];
    var shortest_articles = res.shortest["articles"];
    var shortest_history = res.shortest["history"];

    // Build HTML elements and append to the page.
    for (var i=0; i < num; i++){
        table_row += `<tr><td>${longest_articles[i]}</td><td>${longest_history[i]}</td></tr>`
    }
    $("#longesthistory tbody").empty();
    $("#longesthistory tbody").append(table_head + table_row + table_end);

    table_row = ""; // Clear the string
    for (i=0; i<num; i++){
        table_row += `<tr><td>${shortest_articles[i]}</td><td>${shortest_history[i]}</td></tr>`
    }
    $("#shortesthistory tbody").empty();
    $("#shortesthistory tbody").append(table_head + table_row + table_end)
}

// TODO: summary on charts