const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    dishName: { type: String, required: true },
    timeToPrepare: { type: String, required: true },
    ingredients: { type: [String], required: true },
    steps: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Recipe', recipeSchema);
