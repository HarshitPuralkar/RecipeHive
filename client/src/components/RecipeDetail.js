import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await api.get(`/recipes/${id}`);
            setRecipe(response.data);
        };
        fetchRecipe();
    }, [id]);

    const deleteRecipe = async () => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            await api.delete(`/recipes/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            navigate('/');
        }
    };

    return (
        <div>
            {recipe && (
                <>
                    <h1>{recipe.dishName}</h1>
                    <p>Time to prepare: {recipe.timeToPrepare}</p>
                    <h2>Ingredients:</h2>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h2>Steps:</h2>
                    <p>{recipe.steps}</p>
                    <Link to={`/edit-recipe/${recipe._id}`}>Edit</Link>
                    <button onClick={deleteRecipe}>Delete</button>
                </>
            )}
        </div>
    );
};

export default RecipeDetail;
