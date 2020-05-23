$(document).ready(function () {
    updateDropdown();// TODO: check html id
    $("select option:selected").click(checkArticle);
    $("#searchArticle").click(displaySummary);
    $("#filter").click(filterSummaryAndChart);
})

// Fill the dropdown list with articles and their revision numbers
function updateDropdown() {
    var article_list = []
    $.ajax({
        type: 'GET',
        url: '/analytic/get_all_articles',
        dataType: 'JSON',
        success: function (res) {
            article_list = res
        },
        error: function (xhr) {
            M.toast({html: "Error in updateDropdown: " + xhr.status + " " + xhr.statusText})
        }
    }).done(function () {
        for (s of article_list){
            var title = s._id.title;
            var rev_num = s.count;

            //TODO: fill dropdown list

        }
    })
}

// Check if the selected article is up-to-date
function checkArticle() {
    var formdata = {
        "title": $("#selected_article").val()
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
        var table_element = "<table><thead><tr><th>Title</th><th>Total number of revisions</th></tr></thead><tbody>"
        var table_body = `<tr><td>${formdata.title}</td><td>${summary.revision_num}</td></tr>`

        $("#titleplace").empty();
        $("#titleplace").append(table_element+table_body+"</tbody></table>");

        var table_head = "<table><thead><tr><th>Top 5 users</th><th>Number of revisions</th></tr></thead><tbody>"
        for (var s of summary.top5_user){
            var table_temp = `<tr><td>${s._id.user}</td><td>${s.count}</td></tr>`
            table_head += table_temp
        }

        //TODO: possible sequence error
        $("#titleplace").empty();
        $("#titleplace").append(table_head+"</tbody></table>")

        var radio_select = "<form action='#'>"
        for (var s of summary.top5_user){
            var radio = `<p><label><input class="topuser" type="radio" name="username" value="${s._id.user}"/><span>${s._id.user}</span></label></p>`
            radio_select += radio
        }

        // TODO: 需要一个div
        $("#select_user").empty()
        $("#select_user").append(radio_select+"</form>")

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
            console.log(posts)
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
    var formdata = {
        "title": $("#selected_article").val(),
        "user": $(".topuser :checked").val()
    }
    $.ajax({
        method: 'GET',
        url: '/analytic/get_individual_chart',
        data: formdata,
        dataType: 'JSON',
        success: function (res) {
            //TODO: fill variables
        },
        error: function (xhr) {
            M.toast({html: "Error in filterSummaryAndChart: " + xhr.status + " " + xhr.statusText})
        }
    }).done(function () {
        // TODO: fill charts
    })
}