
$(function () {
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

        const firstName = $('#cFirstName').val().trim();
        const lastName = $('#cLastName').val().trim();
        const city = $('#cCity').val().trim();
        const state = $('#cState').val().trim();
        const profilePic = $('#cprofilePic').val().trim();

        if (firstName === "" || lastName === "" || city === "" || newUser.user_name === "" || newUser.password === "") {
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
                const newClient = {
                    first_name: firstName,
                    last_name: lastName,
                    city: city,
                    state: state,
                    profile_pic: profilePic,
                    UserId: response.id
                }
                $.ajax({
                    method: "POST",
                    url: `/api/customers/`,
                    data: newClient,
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

         const firstName = $('#aFirstName').val().trim();
         const lastName = $('#aLastName').val().trim();
         const city = $('#aCity').val().trim();
         const state = $('#aState').val().trim();
         const profilePic = $("#aprofilePic").val().trim();
         const demo =  $('#youTubeURL').val().trim();
 
         if (firstName === "" || lastName === "" || city === "" || newUser.user_name === "" || newUser.password === "") {
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
                //This console.log is undefined. We need a get function to get the ID, then pass that in.
                //ERROR FIX.
                console.log(response.id);
                const newArtist = {
                     first_name: firstName,
                     last_name: lastName,
                     city: city,
                     state: state,
                     demo: demo,
                     profile_pic: profilePic,
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
 
});