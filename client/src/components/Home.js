import React, { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

const Home = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await api.get('/recipes');
            setRecipes(response.data);
        };
        fetchRecipes();
    }, []);

    return (
        <div>
            <h1>Recipes</h1>
            {recipes.map(recipe => (
                <div key={recipe._id}>
                    <h2>{recipe.dishName}</h2>
                    <p>Time to prepare: {recipe.timeToPrepare}</p>
                    <Link to={`/recipe/${recipe._id}`}>View Recipe</Link>
                </div>
            ))}
        </div>
    );
};

export default Home;
