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
            var collapsible_body = `<li><div class="collapsible-header">${each.title}</div>`

            var time_list = []
            for (t of each.timestamps){
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
    instance.updateData({
        //TODO: author list
    })
}