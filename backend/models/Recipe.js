const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  image: { type: String }, // Image URL
});

module.exports = mongoose.model("Recipe", recipeSchema);
