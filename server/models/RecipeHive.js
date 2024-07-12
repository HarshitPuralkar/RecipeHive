const mongoose = require('mongoose');

const recipehiveSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String
    },
    done:{
        type: Boolean
    }
});

module.exports = mongoose.model("RecipeHive", recipehiveSchema);