const mongoose = require('mongoose');

exports.itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry. No name specified"]
  }
})

exports.Item = new mongoose.model("Item", this.itemsSchema);
