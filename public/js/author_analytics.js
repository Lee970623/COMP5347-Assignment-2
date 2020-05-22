$(document).ready(function () {
    $('.collapsible').collapsible();
    var elems = document.querySelectorAll('.autocomplete');
    var instance = M.Autocomplete.getInstance(elems);
    updateAutoComplete(instance);

    $("#authorSearch").click(searchAuthor);
});

function searchAuthor() {
    var formdata = {"author": $("input #username").val()}
    var articles = [];

    $.ajax({
        type: 'GET',
        url: '/analytics/view_author',
        data: formdata,
        dataType: 'JSON',
        success: function (res) {
            articles = res
        },
        error: function (xhr) {
            M.toast({html: "Error in searchAuthor: " + xhr.status + " " + xhr.statusText})
        }
    }).done(function () {
        var collapsible_head = "<ul class='collapsible'>"

        for (each of articles){
            var collapsible_body = `<li><div class="collapsible-header">Title: ${each._id.title}&nbsp;Revisions: ${each.count}</div>`

            var time_list = []
            for (t of each.timestamp){
                time_list.push(`<p>t</p>`)
            }
            var ts = time_list.join('');

            collapsible_body += `<div class="collapsible-body">${ts}</div> </li>`
        }
        collapsible_head += collapsible_body

        $("#showUserArticle").empty();
        $("#showUserArticle").append(collapsible_head);
    })
}

function updateAutoComplete(instance) {
    var author_list = []
    $.ajax({
        type: 'GET',
        url: '/analytics/get_all_author',
        dataType: 'JSON',
        success: function (res) {
            author_list = res
        },
        error: function (xhr) {
            M.toast({html: "Error in updateAutoComplete: " + xhr.status + " " + xhr.statusText})
        }
    }).done(function () {
        instance.updateData({author_list})
    })
}