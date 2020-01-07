//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  var baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var finalUrl = baseUrl + crypto + fiat;

  request(finalUrl, function (error, response, body) {
    var jsonBody = JSON.parse(body);

    var currentDate = jsonBody.display_timestamp;

    res.write("<p>The current date is " + currentDate + "</p>");
    res.write("<h1>The current price of " + crypto + " is " + jsonBody.last + " " + fiat + "</h1>");
    res.send();
  });
});

app.listen(3000, function(){
  console.log("Server running at port 3000!");
});
