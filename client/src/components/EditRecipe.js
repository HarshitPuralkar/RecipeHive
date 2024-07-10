import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const EditRecipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [dishName, setDishName] = useState('');
    const [timeToPrepare, setTimeToPrepare] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await api.get(`/recipes/${id}`);
            setDishName(response.data.dishName);
            setTimeToPrepare(response.data.timeToPrepare);
            setIngredients(response.data.ingredients.join(', '));
            setSteps(response.data.steps);
        };
        fetchRecipe();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());
        try {
            await api.put(`/recipes/${id}`, { dishName, timeToPrepare, ingredients: ingredientsArray, steps }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            navigate(`/recipe/${id}`);
        } catch (error) {
            alert('Error updating recipe');
        }
    };

    return (
        <div>
            <h1>Edit Recipe</h1>
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
                <button type="submit">Update Recipe</button>
            </form>
        </div>
    );
};

export default EditRecipe;
