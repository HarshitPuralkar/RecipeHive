const Recipe = require('../models/Recipe');

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('author', 'username');
        res.status(200).json(recipes);
    } catch (error) {
        res.status(400).json({ message: 'Failed to fetch recipes' });
    }
};

exports.createRecipe = async (req, res) => {
    try {
        const newRecipe = new Recipe({ ...req.body, author: req.user._id });
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create recipe' });
    }
};

exports.getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('author', 'username');
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({ message: 'Failed to fetch recipe' });
    }
};

exports.updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        if (recipe.author.toString() !== req.user._id) return res.status(401).json({ message: 'Not authorized' });

        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update recipe' });
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        if (recipe.author.toString() !== req.user._id) return res.status(401).json({ message: 'Not authorized' });

        await recipe.remove();
        res.status(200).json({ message: 'Recipe deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete recipe' });
    }
};
