$(document).ready(function () {
    $("#select_article").click(checkArticle);
    $("#show_article_info").click(displaySummary);
    $("#filter").click(filterSummaryAndChart);
})

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
            var revision_num = res.revisions;

            //TODO: modify this
            $("#revision_num").html(revision_num) // Set the number of revisions

            if(! res.is_uptodate){
                updateArticle(formdata);
            }
        },
        error: function (xhr) {
            M.toast({html: "Error: " + xhr.status + " " + xhr.statusText})
        }
    });
}

function updateArticle(formdata) {
    var update_num = 0;

    $.ajax({
        type: 'GET',
        url: '/analytic/update_article',
        data: formdata,
        dataType: 'JSON',
        success: function (res) {
            // TODO: get number of updates
        }
    });

    if(update_num > 0){
        var message = "Updated " + update_num + " revisions"
        M.toast({html: message})
    } else{
        M.toast({html: "No new revisions downloaded."})
    }
}

function displaySummary() {
    // TODO: display content
    // TODO: reddit API
}

function filterSummaryAndChart() {

}