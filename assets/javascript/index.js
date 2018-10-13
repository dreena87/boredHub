var addFive = 5;
var youTubeAPI = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=US&maxResults=' +
addFive
+'&key=AIzaSyCvAof6vnksRm0H8YC_dL2i3VLhr3cfU48';
var youTubeAPINext = youTubeAPI;
var youTubeAPIPrev = youTubeAPI;
var index = 0;
var nextToken = "";
var prevToken = "";
var hasPrevToken = false;

var giphyAPI = "https://api.giphy.com/v1/gifs/trending?api_key=fDL5v4XFp5pWQ4sKnSa55JNFVuzF0LSq&limit=3";
var giphyAPIWithOffset = giphyAPI;
var offset = 0;

function YTinit() {
    $.ajax({
        url: youTubeAPI,
        method: 'GET'
    }).then(function(response){
        console.log(response);
        console.log(hasPrevToken);
        var firstSlide = YTresults(response);
        //index += 5;
        $(firstSlide).attr("class", "videos");    

        $("#player").append(firstSlide);
    });
}

function YTresults(response) {
    let videos = $("<div>");
    for(let i = 0; i < 5; i++){
        var makeiFrame = $('<iframe>');
        makeiFrame.addClass('col-sm-12 col-md-2');
        makeiFrame.attr('width', '100%');
        makeiFrame.attr('height', 'auto');
        makeiFrame.attr('src', 'https://www.youtube.com/embed/' + response.items[i].id);
        makeiFrame.attr('frameborder', '0');
        makeiFrame.attr('allow', 'autoplay; encrypted-media');
        makeiFrame.attr("allowfullscreen", true );
        $(videos).append(makeiFrame);
    }
    nextToken = response.nextPageToken;
    youTubeAPINext = youTubeAPI + "&pageToken=" + nextToken;
    if("prevPageToken" in response){
        prevToken = response.prevPageToken;
        youTubeAPIPrev = youTubeAPI + "&pageToken=" + prevToken;
        hasPrevToken = true;
    } else {
        hasPrevToken = false;
    }
    return videos;
}

function plusYTSlides() {
    $.ajax({
        url: youTubeAPINext,
        method: 'GET'
    }).then(function(response){
        console.log(response);
        var nextSlide = YTresults(response);
        $(nextSlide).attr("class", "videos");
        //$("#player").empty();
        $("#player").append(nextSlide);

        var videos = document.getElementsByClassName("videos");
        videos[index].style.display = "none";
        index++;
    });
}

function minusYTSlides() {
    if(hasPrevToken){    
        $.ajax({
            url: youTubeAPIPrev,
            method: 'GET'
        }).then(function(response){
            console.log(response);
            var prevSlide = YTresults(response);
            $(prevSlide).attr("class", "videos");
            //$("#player").empty();
            $("#player").append(prevSlide);

            var videos = document.getElementsByClassName("videos");
            videos[index].style.display = "none";
            index++;
        });
    }
}

function giphyInit() {
    // offset += 3;
    // giphyAPIWithOffset = giphyAPI + "&offset=" + offset;
    // console.log(offset);
    $.ajax({
        url: giphyAPI,
        method: 'GET'
    }).then(function(response) {
        for(let i = 0; i < 3; i++) {
            let image = $("<img>");
            $(image).attr("src", response.data[i].images.fixed_height.url);
            $(image).attr("alt", "Hilarious GIF!");
            $("#images").append(image);
        }
    });
}

function plusGSlides() {
    offset += 3;
    giphyAPIWithOffset = giphyAPI + "&offset=" + offset;
    console.log(offset);
    $.ajax({
        url: giphyAPIWithOffset,
        method: 'GET'
    }).then(function(response) {
        $("#images").empty();
        for(let i = 0; i < 3; i++) {
            let image = $("<img>");
            $(image).attr("src", response.data[i].images.fixed_height.url);
            $(image).attr("alt", "Hilarious GIF!");
            $("#images").append(image);
        }

        
    });
}

function minusGSlides() {    
    if(offset > 0){
        offset -= 3;
        giphyAPIWithOffset = giphyAPI + "&offset=" + offset;
        $.ajax({
            url: giphyAPIWithOffset,
            method: 'GET'
        }).then(function(response) {
            $("#images").empty();
            for(let i = 0; i < 3; i++) {
                let image = $("<img>");
                $(image).attr("src", response.data[i].images.fixed_height.url);
                $(image).attr("alt", "Hilarious GIF!");
                $("#images").append(image);
            }

            
        });
    }
}

YTinit();
giphyInit();

$("#YTnext").on("click", function() {
    plusYTSlides();
});

$("#YTprev").on("click", function() {
    minusYTSlides();
});

$("#Gnext").on("click", function() {
    plusGSlides();
});

$("#Gprev").on("click", function() {
    minusGSlides();
});