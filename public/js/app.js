
$(function () {

    $("#clientCreate").on("click", createClient)
    function createClient(event) {
        event.preventDefault();

        $('#clientError').removeClass("show")
        $('#cpasswordError').removeClass("show")
        $('#clientSignUp').addClass("show");

        const p1 = $('#cPassword1').val().trim();
        const p2 = $('#cPassword2').val().trim();

        const newUser = {
            email: $('#cEmail').val().trim(),
            user_name: $('#cUserName').val().trim(),
            password: $('#cPassword2').val().trim(),
            user_type: 1
        }
        const clientData = {
            first_name: $('#cFirstName').val().trim(),
            last_name: $('#cLastName').val().trim(),
            city: $('#cCity').val().trim(),
            state: $('#cState').val().trim(),
            UserID: null
        }

        if (clientData.first_name === "" || clientData.last_name === "" || clientData.city === "" || newUser.user_name === "" || newUser.password === "") {
            $('#clientError').addClass("show")
            $('#clientError').toggleClass("alt");
        } else if (p1 != p2) {
            $('#cpasswordError').addClass("show")
            $('#cpasswordError').toggleClass("alt");
        } else {

            $('#clientSignUp').removeClass("show");
            $('#cpasswordError').removeClass("show")
            $('#clientError').removeClass("show")
        }
    }

    $('#clientCancel').on("click", closeClient);
    function closeClient(event) {
        event.preventDefault();

        $('#clientError').removeClass("show")
        $('#cpasswordError').removeClass("show")

        $('#cFirstName').val("");
        $('#cLastName').val("");
        $('#cEmail').val("");
        $('#cUserName').val("");
        $('#cPassword1').val("");
        $('#cPassword2').val("");

        $('#clientSignUp').removeClass("show");
    }

    //ARTIST SIGN UP SECTION

    $('#createArtist').on("click", showArtistModal)
    function showArtistModal(event) {
        event.preventDefault();
        $('#artistSignUp').addClass("show");
    }

    $("#artistCreate").on("click", createArtist)
    function createArtist(event) {
        event.preventDefault();

        $('#artistError').removeClass("show")
        $('#apasswordError').removeClass("show")

        const p1 = $('#aPassword1').val().trim();
        const p2 = $('#aPassword2').val().trim();

        const newUser = {
            email: $('#aEmail').val().trim(),
            user_name: $('#aUserName').val().trim(),
            password: $('#aPassword2').val().trim(),
            user_type: 2
        }

        const artistData = {
            first_name: $('#aFirstName').val().trim(),
            last_name: $('#aLastName').val().trim(),
            city: $('#aCity').val().trim(),
            state: $('#aState').val().trim(),
            profile_pic: $("#aprofilePic").val().trim(),
            demo: $('#youTubeURL').val().trim(),
            UserID: null
        }

        if (artistData.first_name === "" || artistData.last_name === "" || artistData.city === "" || newUser.user_name === "" || newUser.password === "") {
            $('#artistError').addClass("show")
            $('#artistError').toggleClass("alt");
        } else if (p1 != p2) {
            $('#apasswordError').addClass("show")
            $('#apasswordError').toggleClass("alt");
        } else {
            $.ajax({
                method: "POST",
                url: `/api/users/`,
                data: newUser,
                headers: {
                    "authorization": `Bearer ${localStorage.token}`
                }
            }).then(function (response) {
                const newArtist = {
                    first_name: $('#aFirstName').val().trim(),
                    last_name: $('#aLastName').val().trim(),
                    city: $('#aCity').val().trim(),
                    state: $('#aState').val().trim(),
                    demo: $('#youTubeURL').val().trim(),
                    profile_pic: $('#aprofilePic').val().trim(),
                    UserId: response.id
                }

                $.ajax({
                    method: "POST",
                    url: `/api/artists/`,
                    data: newArtist,
                    headers: {
                        "authorization": `Bearer ${localStorage.token}`
                    }
                }).then(function (data) {
                    console.log(data);
                }).catch(function (error) {
                    console.log(error);
                });

            }).catch(function (error) {
                console.log(error);
            });

            $('#artistSignUp').removeClass("show");
            $('#apasswordError').removeClass("show")
            $('#artistError').removeClass("show")
        }
    }

    $('#artistCancel').on("click", closeArtist);
    function closeArtist(event) {
        event.preventDefault();

        $('#artistError').removeClass("show")
        $('#apasswordError').removeClass("show")

        $('#aFirstName').val("");
        $('#aLastName').val("");
        $('#aEmail').val("");
        $('#aUserName').val("");
        $('#aPassword1').val("");
        $('#aPassword2').val("");
        $('#aZipcode').val("");
        $('#aState').val("");
        $('#virtuoso').val("");
        $('#comments').val("");

        $('#artistSignUp').removeClass("show");
    }

    // SIGN IN FUNCTION

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
            console.log(res);
            if (res.message === "Enter Correct Login/PW") {
                return alert("Enter Correct Login/PW");
            }
            console.log(res)
            let usertype = '';
            localStorage.token = res.token;
            localStorage.id = res.id;

            console.log("token:", localStorage.token)

            if (res.user_type === 1) {
                usertype = `customers`;
            } else if (res.user_type === 2) {
                usertype = `artist`;
            }


             window.location.replace(`/${usertype}`);

        }).catch(function(err){
            console.log(err);
            alert('Please Enter Correct Username/Password');
        });
    }

    $('#loginBtn').on('click', signIn);

    //CLIENT SIGN UP SECTION

    $('#createClient').on("click", showClientModal)
    function showClientModal(event) {
        event.preventDefault();
        $('#clientSignUp').addClass("show");
    }

    $("#clientCreate").on("click", createClient)
    function createClient(event) {
        event.preventDefault();

        $('#clientError').removeClass("show")
        $('#cpasswordError').removeClass("show")

        const p1 = $('#cPassword1').val().trim();
        const p2 = $('#cPassword2').val().trim();


        const newUser = {
            email: $('#cEmail').val().trim(),
            user_name: $('#cUserName').val().trim(),
            password: $('#cPassword2').val().trim(),
            user_type: 1
        }

        const newClient = {
            first_name: $('#cFirstName').val().trim(),
            last_name: $('#cLastName').val().trim(),
            city: $('#cCity').val().trim(),
            state: $('#cState').val().trim(),
            profile_pic: $('#cprofilePic').val().trim(),
        }

        if (newClient.first_name === "" || newClient.last_name === "" || newUser.userName === "" || newUser.password === "") {
            $('#clientError').addClass("show")
            $('#clientError').toggleClass("alt");
        } else if (p1 != p2) {
            $('#cpasswordError').addClass("show")
            $('#cpasswordError').toggleClass("alt");
        } else {

            $.ajax({
                method: "POST",
                url: `/api/users/`,
                data: newUser,
                headers: {
                    "authorization": `Bearer ${localStorage.token}`
                }
            }).then(function (response) {
                const newClient1 = {
                    first_name: $('#cFirstName').val().trim(),
                    last_name: $('#cLastName').val().trim(),
                    city: $('#cCity').val().trim(),
                    state: $('#cState').val().trim(),
                    profile_pic: $('#cprofilePic').val().trim(),
                    UserId: response.User
                }

                $.ajax({
                    method: "POST",
                    url: `/api/customers/`,
                    data: newClient1,
                    headers: {
                        "authorization": `Bearer ${localStorage.token}`
                    }
                }).then(function (data) {
                    console.log(data);
                }).catch(function (error) {
                    console.log(error);
                });

            }).catch(function (error) {
                console.log(error);
            });

            $('#clientSignUp').removeClass("show");
            $('#cpasswordError').removeClass("show")
            $('#clientError').removeClass("show")
        }
    }

    $('#clientCancel').on("click", closeClient);
    function closeClient(event) {
        event.preventDefault();

        $('#clientError').removeClass("show")
        $('#cpasswordError').removeClass("show")

        $('#cFirstName').val("");
        $('#cLastName').val("");
        $('#cEmail').val("");
        $('#cUserName').val("");
        $('#cPassword1').val("");
        $('#cPassword2').val("");

        $('#clientSignUp').removeClass("show");
    }
});

    //ARTIST SIGN UP SECTION

//     $('#createArtist').on("click", showArtistModal)
//     function showArtistModal(event) {
//         event.preventDefault();
//         $('#artistSignUp').addClass("show");
//     }

//     $("#artistCreate").on("click", createArtist)
//     function createArtist(event) {
//         event.preventDefault();

//         $('#artistError').removeClass("show")
//         $('#apasswordError').removeClass("show")

//         const p1 = $('#aPassword1').val().trim();
//         const p2 = $('#aPassword2').val().trim();

//         const str = $('#comments').val().trim();

//         const newArtist = {
//             firstName: $('#aFirstName').val().trim(),
//             lastName: $('#aLastName').val().trim(),
//             email: $('#aEmail').val().trim(),
//             userName: $('#aUserName').val().trim(),
//             password: $('#aPassword2').val().trim(),
//             zipcode: parseInt($('#Zipcode').val()),
//             state: $('#aState').val(),
//             artType: $('#virtuoso').val(),
//         }

//         if (newArtist.firstName === "" || newArtist.lastName === "" || newArtist.userName === "" || newArtist.password === "") {
//             $('#artistError').addClass("show")
//             $('#artistError').toggleClass("alt");
//         } else if (p1 != p2) {
//             $('#apasswordError').addClass("show")
//             $('#apasswordError').toggleClass("alt");
//         } else {

//             $('#artistSignUp').removeClass("show");
//             $('#apasswordError').removeClass("show")
//             $('#artistError').removeClass("show")
//         }
//     }

//     $('#artistCancel').on("click", closeArtist);
//     function closeArtist(event) {
//         event.preventDefault();

//         $('#artistError').removeClass("show")
//         $('#apasswordError').removeClass("show")

//         $('#aFirstName').val("");
//         $('#aLastName').val("");
//         $('#aEmail').val("");
//         $('#aUserName').val("");
//         $('#aPassword1').val("");
//         $('#aPassword2').val("");
//         $('#aZipcode').val("");
//         $('#aState').val("");
//         $('#virtuoso').val("");
//         $('#comments').val("");

//         $('#artistSignUp').removeClass("show");
//     }

// });
