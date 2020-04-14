var el = $('.tabs').first()[0];
var instance = M.Tabs.init(el);

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
});

// Or with jQuery

$(document).ready(function() {
    $('select').formSelect();
});