$(document).ready(function () {
    $("select option:selected").click(checkArticle);
    $("#searchArticle").click(displaySummary);
    $("#filter").click(filterSummaryAndChart); //TODO: to be confirmed
})

//TODO: dropdown list
function updateDropdown() {
    var revision_num = res.revisions;

    //TODO: modify this
    $("#revision_num").html(revision_num) // Set the number of revisions

}

// Check if the selected article is up-to-date
function checkArticle() {
    var formdata = {
        "article": $("#selected_article").val()
    }

    $.ajax({
        type: 'GET',
        url: '/analytic/view_individual',
        data: formdata,
        dataType: 'JSON',
        success: function (res) {
            if(! res.is_uptodate){
                updateArticle(res);
            } else{
                M.toast({html: "Article is up-to-date."})
            }
        },
        error: function (xhr) {
            M.toast({html: "Error in checkArticle: " + xhr.status + " " + xhr.statusText})
        }
    });
}

// Update revision for the selected article
function updateArticle(formdata) {
    var update_num = 0;

    $.ajax({
        type: 'GET',
        url: '/analytic/update_article',
        data: formdata,
        dataType: 'JSON',
        success: function (res) {
            update_num = res.updated_num;
        },
        error: function (xhr) {
            M.toast({html: "Error in updateArticle: " + xhr.status + " " + xhr.statusText})
        }
    }).done(function () {
        if(update_num > 0){
            var message = "Updated " + update_num + " revisions";
            M.toast({html: message});
        } else{
            M.toast({html: "No new revisions on wiki."});
        }
    })

}

// Display summary imformation for the selected article.
function displaySummary() {
    var formdata = {"title": $("#selected_article").val()}
    var summary = {
        "title": title,
        "revision_num": 0,
        "top5_user": [],
        "top5_user_rev": []
    }

    $.ajax({
        type: 'GET',
        url: '/analytic/view_article_summary',
        data: formdata,
        dataType: 'JSON',
        success: function (res) {
            summary.revision_num = res.revision_num;
            summary.top5_user = res.top5_user;
            summary.top5_user_rev = res.top5_user_rev;
        },
        error: function (xhr) {
            M.toast({html: "Error in displaySummary: " + xhr.status + " " + xhr.statusText})
        }
    }).done(function () {
        //TODO: render summary HTML
        var table_element = ""

    }).then(getRedditPosts(formdata))
}

// Call Reddit API
function getRedditPosts(formdata) {
    var posts = []

    $.ajax({
        method: 'GET',
        url: '/analytic/get_reddit_posts',
        data: formdata,
        dataType: 'JSON',
        success: function (res) {
            posts = res
        },
        error: function (xhr) {
            M.toast({html: "Error in getRedditPosts: " + xhr.status + " " + xhr.statusText})
        }
    }).done(function (posts) {
        var table_head = "<table><thead><tr><th>Reddit r/news</th></tr></thead><tbody>";

        for (var each of posts){
            var table_body = `<tr><td><a href="${each.url}">${each.title}</a></td></tr>`;
            table_head += table_body
        }
        table_head += "</tbody></table>"

        $("#posts").empty();
        $("#posts").append(table_head);
    })
}

// Show charts for the selected article.
function filterSummaryAndChart() {

}