const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  nomeAuthor: { type: String, required: true },
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String },
  data: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Posts", postsSchema);
