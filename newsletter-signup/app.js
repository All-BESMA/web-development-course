//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          "FNAME": firstName,
          "LNAME": lastName
        }
      }
    ]
  }

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/7002696d28",
    method: "POST",
    headers: {
      "Authorization": "xulepeta 912b30e9fb450671fcb9f1ace13dc28a-us4"
    },
    body: JSON.stringify(data)
  }
  request(options, function(error, response, body){
    if(error || response.statusCode < 200 || response.statusCode > 299){
      res.sendFile(__dirname + "/failure.html");
      //res.send("<p>Something went wrong! " + response.statusCode + " </p>");
    }else{
      res.sendFile(__dirname + "/success.html");
      //res.send("<p>Success!</p>");
    }
  });

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});

//List id
//7002696d28

//API Key
//912b30e9fb450671fcb9f1ace13dc28a-us4
