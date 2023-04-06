function onLoad () {
    let searchButton = document.getElementById("searchButton");

    searchButton.style.display = 'inline';
    searchButton.addEventListener("click", callLoad);
}

var loadedElement;
var loadElement;

function callLoad () {
    console.log("Begin callLoad");
    loadElement = $("#loading");
    loadedElement = $("#loaded");
    //$("#output").style.display = 'none';
    var year = $("#yearIn").val();
    var sex = $("#sexIn").val();
    console.log(year + ", " + sex);

    if (year > 2022 || year < 1920) {
        alert("Year is out of range");
        return;
    }

    if (sex != "F" && sex != "M") {
        alert("Invalid Sex");
        return;
    }

    //var url = "https://data.novascotia.ca/resource/emf8-vmuy.json"
    //$where=year%20like%20year

    var url = "https://data.novascotia.ca/resource/emf8-vmuy.json?$where=year=%27" + year + "%27%20and%20sex=%27" + sex + "%27";
    
    console.log(url);
    loadedElement.css({ "display" : "none" });
    loadElement.css({ "display" : "inline" });

    $.get(url, function(data, status){
        var output = "";

        for (let i = 0; i < data.length; i++) {
            const element = data[i];

            var posAdd = "";
            if (i == 0) {
                posAdd = "top1";
            } else if (i == 1) {
                posAdd = "top2";
            } else if (i == 2) {
                posAdd = "top3";
            } else {
                posAdd = "other";
            }

            output += '<div class="listPart" id="' + ((i % 2 == 0) ? "hot" : "cold") + '">';
            output +=       '<p class="rank" id=' + posAdd + '>' + (i + 1) + "</p>";
            output +=       '<div class="sideBar">';
            output +=           '<p id="name">' + element.first_name + "</p>";
            output +=           '<p id="amount">' + element.count + " counts</p>";
            output += "</div></div>";
        }
        console.log(output);
        $("#loaded").html(output);
        loadedElement.css({ "display" : "inline" });
        loadElement.css({ "display" : "none" });
    });
}


window.addEventListener("load", function(event) {

    onLoad();

});