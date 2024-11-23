const Recipe = require("../models/Recipe");

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createRecipe = async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const recipe = await Recipe.create({
      user: req.user.id,
      title,
      ingredients,
      instructions,
      image,
    });
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, instructions } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    recipe.title = title || recipe.title;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    if (image) recipe.image = image;

    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Recipe.deleteOne({ _id: id }); // Fixed deletion
    res.json({ message: "Recipe removed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getRecipes, createRecipe, updateRecipe, deleteRecipe };
