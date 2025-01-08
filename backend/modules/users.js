const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posts" }],
});

module.exports = mongoose.model("Users", userSchema);
