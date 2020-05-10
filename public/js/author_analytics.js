$(document).ready(function () {
    $("#input_name").click(searchAuthor);
});

function searchAuthor() {
    var formdata = {}

    $.ajax({
        type: 'GET',
        url: '/analytics/view_author',
        data: formdata,
        dataType: 'JSON',
        success: function () {
            // TODO:
        }
    });
}