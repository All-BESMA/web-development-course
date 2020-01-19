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
  var amount = req.body.amount;

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  }
  request(options, function (error, response, body) {
    var jsonBody = JSON.parse(body);

    var currentDate = jsonBody.time;

    res.write("<p>The current date is " + currentDate + "</p>");
    res.write("<h1>The current price of " + amount + " " + crypto + " is " + jsonBody.price + " " + fiat + "</h1>");
    res.send();
  });
});

app.listen(3000, function(){
  console.log("Server running at port 3000!");
});
