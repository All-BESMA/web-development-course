//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const _ = require("lodash")
const item = require(__dirname + "/models/item.js")
const list = require(__dirname + "/models/list.js")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

app.get("/", function(req, res) {

  item.Item.find({}, function(err, foundItems){
    if(err){
      console.log("Error fetching DB elements: " + err);
    }else{
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  });
});

app.get("/:customListName", function(req, res){
  let listName = _.capitalize(req.params.customListName);

  list.List.findOne({name: listName}, function(err, foundList){

    if(!foundList){
      let newList = new list.List({
        name: listName,
        items: []
      });
      newList.save();
      res.redirect("/" + listName);
    }else{
      res.render("list", {listTitle: listName, newListItems: foundList.items});
    }
  });
});

app.post("/", function(req, res){
  const itemName = req.body.newItem;
  const newItem = new item.Item({name: itemName});
  const listName = req.body.list;

  if(listName === "Today"){
    newItem.save();
    res.redirect("/");
  }else{

    list.List.findOne({name: listName}, function(err, foundList){
      if(!foundList){
        let newList = new list.List({
          name: listName,
          items: [newItem]
        });
        newList.save();
      }else{
        foundList.items.push(newItem);
        foundList.save();
      }

      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function(req, res){
  let id = req.body.checkbox;
  let listName = req.body.listName;
  if(listName === "Today"){
    item.Item.findByIdAndRemove(id, function(err){
      if(err){
        console.log("Error deleting element: " + err)
      }
      res.redirect("/");
    });
  }else{
    list.List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: id}}}, function(err, results){
      if(err){
        console.log("Error thrown when deleting item from list: " + err);
      }

      res.redirect("/" + listName);
    });
  }
})

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
