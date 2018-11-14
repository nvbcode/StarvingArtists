$(function () {
    const searchField = {
        'queryParams':$('#starveSearch').val().trim()
    };



    $('#starveSubmit').on('click', function (e) {
        
        $.ajax({
            method: 'GET',
            url: '/api/search',
            data: searchField
        }).then(function (searchResults) {
            console.log(searchResults);
        })
        e.preventDefault();


    })

});