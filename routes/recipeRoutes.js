const express = require('express');
const { getAllRecipes, createRecipe, updateRecipe, deleteRecipe, getRecipe } = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getAllRecipes).post(protect, createRecipe);
router.route('/:id').get(getRecipe).put(protect, updateRecipe).delete(protect, deleteRecipe);

module.exports = router;
