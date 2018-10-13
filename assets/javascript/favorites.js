  var db = firebase.database();
  var email = "myfancyemail@gmailDOTcom";

  db.ref().on("value", function(snapshot) {
    //$("#favs").empty(); 
    var favorites = snapshot.child("users/" + email + "/favorites").val();
     console.log(favorites);
    for(var sha in favorites) {
        //console.log(favorites[sha]);
        let holder = $("<div>");
        $(holder).attr("class", "col-3");

        let image = $("<img>");
        $(image).attr("src", favorites[sha]);
        $(image).attr("alt", "Hilarious GIF!");

        let button = $("<button>");
        $(button).attr("class", "btn btn-danger btn-sm btn-block unfavorite");
        $(button).text("Unfavorite");

        $(holder).append(image);
        $(holder).append(button);
        $("#favs").prepend(holder);
    }
  });