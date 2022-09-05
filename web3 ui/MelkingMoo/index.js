function changeDiv(fromCon, toCon) {


    if (document.getElementById(fromCon).style.display === "block" && document.getElementById(toCon).style.display === "none") {

        document.getElementById(fromCon).style.display = "none";
        document.getElementById(toCon).style.display = "block";

    }

    else {

        document.getElementById(fromCon).style.display = "block";
        document.getElementById(toCon).style.display = "none";

    }

    //console.log(fromCon, toCon)
}