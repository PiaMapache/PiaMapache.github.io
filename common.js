var hasGET = false;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function callList() {
    var imgList = {};

    // First we get the pre-generated list of files
    requestURI("gallery/thumb/list").then(
        function (value) {
            // This is executed if the file is properly fetched
            // The contents of the file are held in value
            imgList = value.split("\n");
            populateList(imgList)
        },
        function (reason) {
            console.error("Something wrong", reason);
      });
}

function populateList (imgList) {
    // Get the grid element to start adding thumbnails
    var grid = document.getElementById("art-grid-container");
    
    shuffle(imgList);

    for (let i = 0; i < imgList.length; i++) {
        if (imgList == "" || imgList[i][0] == "#") continue;

        var div = document.createElement("div");
        var thumb = document.createElement("img");
        div.style = "padding:1rem;";
        thumb.className = "thumbnail";
        thumb.src = "gallery/thumb/" + imgList[i];
        thumb.onclick = function () { gallerize('gallery/' + imgList[i].replace("th-", "")); };
        
        div.appendChild(thumb);
        grid.appendChild(div);    
    }
}

function loadImage(im) {
    var parent = document.getElementById("lighttable");
    var image = document.createElement("img");
    image.src = im;
    image.onclick = function () { ungallerize(); };
    parent.appendChild(image);
}

function gallerize(imageID) {
    //jQuery("#lt").load("lighttable.html");
    var nlt = document.createElement("div");
    nlt.id = "lighttable";

    document.getElementById("lt").appendChild(nlt);

    loadImage(imageID)
}

function ungallerize() {
    var olt = document.getElementById("lighttable");
    document.getElementById("lt").removeChild(olt);
}

function getGET () {
    var gs = location.search.split('?');

    // In this case there is no GET string, so act accordingly
    if (gs.length == 1) {
        hasGET = false;
        return {};
    }

    var ga = gs[1].split('&');

    var get = {};

    for (let i = 0; i < ga.length; i++) {
        var currKey = ga[i].split('=')[0];
        var currName = ga[i].split('=')[1];
        
        get[currKey] = currName;
    }
    
    hasGET = true;
    return get;
}

var GET = getGET();

if (GET["debug"] == "true") {
    console.log(GET);
}