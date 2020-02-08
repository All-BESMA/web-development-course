//jshint esversion:6

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Peach",
  rating: 7,
  review: "Peaches are cool."
});

//fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const pineapple = new Fruit({
  name: "Pineapple",
  rating: 9,
  review: "Great fruit!"
});

const grape = new Fruit({
  name: "Grape",
  rating: 6,
  review: "Grape fruit!"
});

//pineapple.save();
//grape.save();

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "Amy",
  age: 12,
  favouriteFruit: pineapple
});

//person.save();

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "Awesome as a fruit."
});

const orange = new Fruit({
  name: "Orange",
  rating: 11,
  review: "Best fruit ever."
});

const banana = new Fruit({
  name: "Banana",
  rating: 3,
  review: "Tastes weird."
});

// Fruit.insertMany([kiwi, orange, banana], function(error, docs){
//   if(error) {
//     console.log("Error inserting many: " + error)
//   }else{
//     console.log("Inserted many successfully.");
//   }
// });

Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  }else{
    //console.log(fruits);
    fruits.forEach(function(element){
      console.log(element.name);
    });

    mongoose.connection.close();
  }
});

Fruit.updateOne({_id: "5e395d1387506e6ef1d4ab4d"}, {name: "Peach"}, function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully updated your fruit.");
  }
});

Fruit.deleteOne({_id: "5e395d1387506e6ef1d4ab4d"}, function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully deleted your fruit.");
  }
});

Person.updateOne({name: "John"}, {favouriteFruit: grape}, function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully updated your person");
  }
});

// Person.deleteMany({name: "John"}, function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully deleted your people.");
//   }
// });
