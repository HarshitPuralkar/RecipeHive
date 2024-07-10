import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CreateRecipe from './components/CreateRecipe';
import RecipeDetail from './components/RecipeDetail';
import EditRecipe from './components/EditRecipe';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create-recipe" element={<CreateRecipe />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
                <Route path="/edit-recipe/:id" element={<EditRecipe />} />
            </Routes>
        </Router>
    );
}

export default App;
