// Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.
// We chose animals for our theme, but you can make a list to your own liking.


// Array topics to contain button text.

var topics = ["The Gummy Bears", "David the Gnome", "Doug", "Teenage Mutant Ninja Turtles", "Darkwing Duck", "The Tick", "Spongebob", "She-ra", "The Fairly Odd Parents", "Jem and the Holograms", "Rocko's Modern Life", "Daria", "Recess", "Lloyd in Space", "Jimmy Neutron", "The Rocky and Bullwinkle Show", "Animaniacs", "Carebears", "Fragglerock", "My Little Pony"];


// Your app should take the topics in this array and create buttons in your HTML.
// Try using a loop that appends a button for each string in the array.

// Function for creating starter buttons.
function renderButtons() {

    // Deleting the movies prior to adding new movies.
    $("#buttonCorral").empty();

    // Looping through the array of topics.
    for (var i = 0; i < topics.length; i++) {

        // Generate buttons.
        var a = $("<button class=\"topical\">");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttonCorral").append(a);
    }

    // BONUS: Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.

    // This function handles events where a movie button is clicked
    $("#addTopic").on("click", function addATopic(e) {
        e.preventDefault();
        // This line grabs the input from the textbox
        var newTopic = $("#tInput").val().trim();

        // Adding movie from the textbox to our array
        topics.push(newTopic);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

};

// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// Under every gif, display its rating (PG, G, so on).

function releaseGifs() {

    var t = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + t + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var results = response.data;
        
        
        for (var i = 0; i < results.length; i++) {
            
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var tImage = $("<img>");
            tImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(tImage);

            $("#gifCorral").prepend(gifDiv);
        }




    });
}

// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
$("img").on("click", function() {

    if (state === "still") {

        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    };

})

// // Adding a click event listener to all elements with a class of "movie"
$(document).on("click", ".topical", releaseGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();

// Rejoice! You just made something really cool.
