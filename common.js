function loadImage(im) {
    var parent = document.getElementById("lighttable");
    var image = document.createElement("img");
    image.src = "art/" + im + ".png";
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
    var ga = location.search.split('?')[1].split('&');

    var get = {};

    for (let i = 0; i < ga.length; i++) {
        var currKey = ga[i].split('=')[0];
        var currName = ga[i].split('=')[1];
        
        get[currKey] = currName;
    }
    
    return get;
}

var GET = getGET();

if (GET["debug"] == "true") {
    console.log(GET);
}