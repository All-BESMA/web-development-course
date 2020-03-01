const mongoose = require('mongoose');
const item = require(__dirname + "/item.js")

exports.listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry. No name specified"]
  },
  items: [item.itemsSchema]
})

exports.List = new mongoose.model("List", this.listSchema);
