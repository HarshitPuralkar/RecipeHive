const express = require('express');
const router = express.Router();
const RecipeHiveController = require("../controllers/RecipeHive");
const {authenticate} = require("../middleware/authMiddle");

router.get('/', RecipeHiveController.getAllRecipeHives);
router.post('/', RecipeHiveController.createRecipeHive);
router.patch('/:id',RecipeHiveController.updateRecipeHive);  // Use :id for specific resource
router.delete('/:id', RecipeHiveController.deleteRecipeHive); // Use :id for specific resource

module.exports = router;
