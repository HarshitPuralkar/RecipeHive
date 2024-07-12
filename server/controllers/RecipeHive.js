const RecipeHive = require("../models/RecipeHive");

exports.getAllRecipeHives = async (req, res) => {
    try {
        const allRecipeHives = await RecipeHive.find();
        return res.status(200).send(allRecipeHives);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(400).send({ message: 'Error fetching RecipeHive' });
    }
};

exports.createRecipeHive = async (req, res) => {
    try {
        const newRecipeHive = await RecipeHive.create(req.body);
        return res.status(201).send({ newRecipeHive });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(400).send({ message: 'Error creating RecipeHive' });
    }
};

exports.updateRecipeHive = async (req, res) => {
    try {
        const updatedRecipeHive = await RecipeHive.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedRecipeHive) {
            return res.status(404).send({ message: 'RecipeHive not found' });
        }
        return res.status(200).send({ updatedRecipeHive });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(400).send({ message: 'Error updating RecipeHive' });
    }
};

exports.deleteRecipeHive = async (req, res) => {
    try {
        const deletedRecipeHive = await RecipeHive.findByIdAndDelete(req.params.id);
        if (!deletedRecipeHive) {
            return res.status(404).send({ message: 'RecipeHive not found' });
        }
        return res.status(200).send({ deletedRecipeHive });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(400).send({ message: 'Error deleting RecipeHive' });
    }
};
