$(document).ready(function () {
    $("#changenum").click(changeTopNumber);
    $("#viewanalytics").click(viewAnalytics);
});

// Change the top number displayed by analytics.
function changeTopNumber() {
    var num = $("#topnum_input").val()

    $.ajax({
        type: "GET",
        url: "/analytic/changetopnum",
        dataType: "JSON",
        success: function (res) {
            M.toast({html: "Top number set success."})
        },
        error: function (xhr) {
            M.toast({html: "Error: " + xhr.status + " " + xhr.statusText})
        }
    });
}


function viewAnalytics() {
    var option = $("#select_option").val()
    var target = 'top_highest_revision' //TODO: modify this

    switch (target){
        case 'top_highest_revision':
            viewTopHighestRevision();
            break;
        case 'top_lowest_revision':
            viewTopLowestRevision();
            break;

        // TODO:
    }
}


function viewTopHighestRevision() {
    //TODO: templet
    $.ajax({
        type: 'GET',
        url: '/analytic/tophighestrevision',
        dataType: 'JSON',
        success: function () {
            M.toast({html: "Query success"})
        },
        error: function (hxr) {
            M.toast({html: "Error: " + xhr.status + " " + xhr.statusText})
        }
    });
}
