$(document).ready(function () {
    var elems = document.querySelectorAll('.autocomplete');
    var instance = M.Autocomplete.getInstance(elems);
    updateAutoComplete(instance);

    $("#search_author").click(searchAuthor);
});

function searchAuthor() {
    var formdata = {"author": $("#input_author").val()}

    $.ajax({
        type: 'GET',
        url: '/analytics/view_author',
        data: formdata,
        dataType: 'JSON',
        success: function () {
            // TODO: display articles for the selected user
        },
        error: function (xhr) {
            M.toast({html: "Error in searchAuthor: " + xhr.status + " " + xhr.statusText})
        }
    });
}

function updateAutoComplete(instance) {
    instance.updateData({
        //TODO: author list
    })
}