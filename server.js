//Global Variable
var tablesAvailable = 5;

//Import Packages
var express = require("express");
var path = require("path");

//Setup Server
var app = express();
var PORT = 3000;

//Set up app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Arreglo de objetos
var tables = [

];

var waitList = [

];


//Programacion de rutas
app.get("/", (req, resp) => {

    resp.sendFile(path.join(__dirname, "home.html"))

});

app.get("/reserve", (req, resp) => {

    resp.sendFile(path.join(__dirname, "reserve.html"));

});

app.get("/tables", (req, resp) => {

    resp.sendFile(path.join(__dirname, "tables.html"));

});

app.get("/api/tables", (req, resp) => {

    resp.json(tables);

});

app.get("/api/waitlist", (req, resp) => {

    resp.json(waitList);

});

app.post("/api/tables", (req, resp) => {

    var table = req.body;

    if (tablesAvailable == 0) {

        waitList.push(table);

    }
    else {

        tables.push(table);

        tablesAvailable--;
    }


});

app.get("/clear", (req, resp) => {

    if (tablesAvailable != 5) {
        var tableCleared = tables.shift();

        console.log(`Table of ${tableCleared.name} cleared...`);

        tablesAvailable++;
    }

    if (tablesAvailable > 0 && waitList.length != 0) {
        var moveToReservation = waitList.shift();
        tables.push(moveToReservation);

        console.log(`Table of ${moveToReservation.name} moved to reservations.`);

        tablesAvailable--;
    }

    resp.sendFile(path.join(__dirname, "tables.html"));
});

//Abrienndo puerto para escuchar requests
app.listen(PORT, () => {

    console.log("Server listening on port " + PORT)

});