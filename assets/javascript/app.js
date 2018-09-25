var cars = ['BMW', 'MAZDA', 'Dodge'];

function displaycarInfo() {

    $('#carsView').empty();

    var car = $(this).attr('data-name');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function (response) {
            console.log(response)
            var results = response.data;

            for (var i = 0; i < results.length; i++) {


                if (results[i].rating == "r" || results[i].rating == "r") {
                    console.log("r", results)

                } else {


                    var rating = results[i].rating;

                    var p = $('<p>').text("Rating: " + rating);
                   

                    var carImage = $('<img>');
                    // carImage.addClass('card-img-top');
                    carImage.attr('src', results[i].images.fixed_height_still.url);
                    carImage.attr('data-still', results[i].images.fixed_height_still.url);
                    carImage.attr('data-animate', results[i].images.fixed_height.url);
                    carImage.attr('data-state', 'still');
                    carImage.addClass('carImage');

                    $('#carsView').append(p);
                    $('#carsView').append(carImage);


                }

            }

            $('.carImage').on('click', function () {
                var state = $(this).attr('data-state');
                console.log(state);

                if (state == 'still') {
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                } else {
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                }

            });


        });

}


function renderButtons() {


    $('#buttonsView').empty();


    for (var i = 0; i < cars.length; i++) {


        var a = $('<button>')
        a.addClass('car');
        a.addClass("btn btn-success");
        a.addClass("btn btn-primary btn-lg");
        a.attr('data-name', cars[i]);
        a.text(cars[i]);
        $('#buttonsView').append(a);
    }
}


$('#addcar').on('click', function () {


    var car = $('#car-input').val().trim();


    cars.push(car);


    renderButtons();


    return false;
})


$(document).on('click', '.car', displaycarInfo);



renderButtons();