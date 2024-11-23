const express = require("express");
const multer = require("multer");
const {
  getRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Upload folder

router.route("/")
  .get(protect, getRecipes)
  .post(protect, upload.single("image"), createRecipe);

router.route("/:id")
  .put(protect, upload.single("image"), updateRecipe)
  .delete(protect, deleteRecipe);

module.exports = router;
