const mongoose = require('mongoose');

exports.articlesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please check your data entry. No title was specified."]
  },

  content: {
    type: String,
    required: [true, "Please check your data entry, No content was specified."]
  }
});

exports.Article = new mongoose.model("Article", this.articlesSchema);
