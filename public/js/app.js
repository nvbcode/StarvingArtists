$(document).ready(function () {



    const signIn = function (e) {
        e.preventDefault();
        signInData = {
            user_name: $('#userName').val(),
            password: $('#password').val()
        };
        console.log(signInData);
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: signInData
        }).then(function (res) {
            // console.log(res)
            let routeUrl = '';
            localStorage.token = res.token;

            // write a conditional if the response gives usertype 1 or 2. then do another ajax call that routes you to the right page
            console.log("token:", localStorage.token)
            if (res.user_type === 1) {
                routeUrl = `/api/artist/${res.id}`;
            } else if (res.user_type === 2) {
                routeUrl = `/api/client/${res.id}`;
            }

            window.location.replace(routeUrl);
        })
    }

    $('#loginBtn').on('click', signIn);

});