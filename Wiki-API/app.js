//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const article = require(__dirname + "/models/article.js");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


mongoose.connect("mongodb://localhost:27017/wikiDB");

app.get("/", function(req, res){
	article.Article.find({}, function(err, foundItems){
    if(err){
      console.log("Error fetching DB articles: " + err);
    }else{
      console.log(foundItems);
    }
  });

});

app.listen(3000, function(){
	console.log("Server running on port 3000");
});
