import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const CreateRecipe = () => {
    const [dishName, setDishName] = useState('');
    const [timeToPrepare, setTimeToPrepare] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());
        try {
            await api.post('/recipes', { dishName, timeToPrepare, ingredients: ingredientsArray, steps }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            navigate('/');
        } catch (error) {
            alert('Error creating recipe');
        }
    };

    return (
        <div>
            <h1>Create Recipe</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Dish Name"
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Time to Prepare"
                    value={timeToPrepare}
                    onChange={(e) => setTimeToPrepare(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Ingredients (comma separated)"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                />
                <textarea
                    placeholder="Steps"
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                ></textarea>
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    );
};

export default CreateRecipe;
