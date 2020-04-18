var el = $('.tabs').first()[0];
var instance = M.Tabs.init(el);

$(document).ready(function () {
    $('select').formSelect(); // TODO: 这是哪个方法？
    $('#signin').click(varifySignin);
    $('#signup').click(signUp);
});

//Verify input from sign-in page
function varifySignin() {
    var formdata = {
        email: $('#email').val(),
        password: $('#password').val()
    }

    // Verify input data
    if (formdata.email.length == 0 || formdata.password == 0) {
        M.toast({html: "Can not leave as empty!"})
    } else {
        console.log(formdata); // Test line

        // Post form data to contorller
        $.ajax({
            type: 'POST',
            url: '/signin',
            dataType: 'JSON',
            data: formdata,
            success: function (res) {

                alert(JSON.stringify(res)) //Test line.

                if (res.loginStatus) {
                    window.location.href = '/main'
                } else {
                    //alert("Wrong username or password.")
                    M.toast({html: "Wrong username or password."})
                }
            }
        })
    }
}

// Sign-up
function signUp() {
    //TODO: Verify input from sign-up page

    var formdata = {
        email: $('#re_email').val(),
        password: $('#re_password').val(),
        firstname: $('#firstname').val(),
        lastname: $('#lastname').val(),
        question: $('#questions').val(),
        answer: $('#answer').val(),
    }

    $.ajax({
        type: 'POST',
        url: '/signup',
        dataType: 'JSON',
        data: formdata,
        success: function (res) {
            alert(JSON.stringify(res));//Test line.

            if (res.registerStatus) {
                window.location.href = '/main'
            } else {
                //TODO: Materialize toast
                alert('Sign-up failed.')
            }
        }
    });
}