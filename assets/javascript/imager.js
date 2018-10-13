var config = {
    apiKey: "AIzaSyAmqBOMa3ihtUD1j1V0SEKpdaVx_N_y2l0",
    authDomain: "bored-hub.firebaseapp.com",
    databaseURL: "https://bored-hub.firebaseio.com",
    projectId: "bored-hub",
    storageBucket: "bored-hub.appspot.com",
    messagingSenderId: "589336015645"
  };
  firebase.initializeApp(config);
  var db = firebase.database();

var imager = {
    apis: {
        giphy: {
            apikey: "fDL5v4XFp5pWQ4sKnSa55JNFVuzF0LSq",
            url: "https://api.giphy.com/v1/gifs/trending"
        },
        imgur: {
            access_token: "21f9706c77e8c26362491edb4c2d60f157cdb8f8",
            settings: {
                "async": true,
                "crossDomain": true,
                "url": "https://api.imgur.com/3/gallery/hot",
                "method": "GET",
                "headers": {
                    "Authorization": "Client-ID e5002aa5a1de269"
                }
            }
        }
    },
    db: firebase.database(),
    ref: "",
    index: 0,
    offset: 0,
    giphyResponse: [],
    imgurResponse: [],
    email: "myfancyemail@gmailDOTcom",
    query: function() {
        $.ajax({
            url: imager.apis.giphy.url + "?api_key=" + imager.apis.giphy.apikey + "&limit=60&offset=" + imager.offset,
            method: "GET"
        }).then(function(response) {
            console.log("Giphy Response:");
            //console.log(response);
            imager.giphyResponse = response.data;
            console.log(imager.giphyResponse);
        });

        // $.ajax(imager.apis.imgur.settings).done(function(response) {
        //     console.log("Imgur Response:");
        //     //console.log(response);
        //     imager.imgurResponse = response.data;
        //     console.log(imager.imgurResponse);
        // });
    },
    loadInitial: function() {
        $("#image").attr("src", this.giphyResponse[0].images.fixed_height.url);
    },
    unoMas: function() {
        this.index++;
        $("#image").attr("src", this.giphyResponse[this.index].images.fixed_height.url);

        if((this.index + 1) % 60 === 0) {
            this.index = -1;
            this.offset += 60;
            this.query();
        }
    }, 
    favorite: function() {
        let fav = this.giphyResponse[this.index].images.fixed_height.url;
        db.ref("users/" + this.email).child("favorites").push(fav);
        console.log(this.ref);
    }
}

imager.query();
setTimeout(function() {imager.loadInitial()}, 2000);

$("#more").on("click", function() {
    imager.unoMas();
});

$("#fav").on("click", function() {
    imager.favorite();
});

db.ref().on("value", function(snapshot) {
    imager.ref = snapshot.val();
});