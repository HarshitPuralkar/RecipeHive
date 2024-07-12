import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { vegRecipes } from './vegRecipes';
import { paneerRecipes } from './paneerRecipes';
import { chickenRecipes } from './chickenRecipes';
import { muttonRecipes } from './mutton';
import { biryanis } from './Biryanis';
import { nonVegBiryaniRecipes } from './nonVegBiryanis';
import { seeFoodRecipes } from './seaFood';
import logo from './RecipeHive.jpeg';
import { images } from './img';

import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import AddRecipeForm from './AddRecipeForm'; // Import the AddRecipeForm component

const allRecipes = {
  veg: vegRecipes,
  paneer: paneerRecipes,
  biryanis: biryanis,
  mutton: muttonRecipes,
  chicken: chickenRecipes,
  seafood: seeFoodRecipes,
  nonVegBiryanis: nonVegBiryaniRecipes,
  nonveg: [...muttonRecipes, ...chickenRecipes, ...seeFoodRecipes, ...nonVegBiryaniRecipes] // Combined non-veg recipes
};

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [signedIn, setSignedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const [filteredRecipes, setFilteredRecipes] = useState([...vegRecipes, ...paneerRecipes, ...biryanis, ...allRecipes.nonveg]); // Default to veg and non-veg recipes
  const [searchTerm, setSearchTerm] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false); // New state for sign-in form
  const [showAddRecipe, setShowAddRecipe] = useState(false); // State to control Add Recipe form

  const handleSignIn = () => {
    setSignedIn(true);
    localStorage.setItem('loggedIn', 'true'); // Store logged-in status in local storage
  };
  const handleSignOut = () => {
    setSignedIn(false);
    localStorage.removeItem('loggedIn'); // Remove logged-in status from local storage
  };
  const handleRecipeSelect = (recipe) => setSelectedRecipe(recipe);
  const handleBackToRecipes = () => setSelectedRecipe(null);
  const handleFilter = (type) => setFilteredRecipes(allRecipes[type]);
  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = [...vegRecipes, ...paneerRecipes, ...biryanis, ...allRecipes.nonveg].filter(recipe =>
      recipe.title.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredRecipes(filtered);
  };

  const handleSignUpClick = () => setShowSignUp(true);
  const handleBackToMainFromSignUp = () => setShowSignUp(false);
  const handleSignInClick = () => setShowSignIn(true); // Show sign-in form
  const handleBackToMainFromSignIn = () => setShowSignIn(false); // Hide sign-in form and show main content
  const handleAddRecipeClick = () => setShowAddRecipe(true); // Show Add Recipe form
  const handleBackToMainFromAddRecipe = () => setShowAddRecipe(false); // Hide Add Recipe form and show main content

  const handleAddRecipe = (newRecipe) => {
    setFilteredRecipes([...filteredRecipes, newRecipe]);
    setShowAddRecipe(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">
          <img src={logo} className="App-logo-small" alt="Logo" />
          <span></span>
        </div>
        <div className="buttons">
          {!signedIn && !showSignUp && !showSignIn && (
            <>
              <button className='SignIn' onClick={handleSignInClick}>Sign In</button>
              <button className='SignOut' onClick={handleSignUpClick}>Sign Up</button>
            </>
          )}
          {signedIn && (
            <>
              <button onClick={handleSignOut}>Sign Out</button>
              <button onClick={handleAddRecipeClick}>Add Recipe</button>
            </>
          )}
        </div>
      </header>
      <main className="content">
        {showSignUp ? (
          <SignUpForm handleBackToMain={handleBackToMainFromSignUp} />
        ) : showSignIn ? (
          <SignInForm handleBackToMain={handleBackToMainFromSignIn} handleSignIn={handleSignIn} />
        ) : showAddRecipe ? (
          <AddRecipeForm handleAddRecipe={handleAddRecipe} handleBackToMain={handleBackToMainFromAddRecipe} />
        ) : selectedRecipe ? (
          <div className="recipe-details">
            <button onClick={handleBackToRecipes}>Back to Recipes</button>
            <h1>{selectedRecipe.title}</h1>
            <img src={images[selectedRecipe.title]} alt={selectedRecipe.title} />
            <div>
              <h3>Ingredients:</h3>
              <ul>
                {Array.isArray(selectedRecipe.ingredients) ? (
                  selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))
                ) : (
                  <li>{selectedRecipe.ingredients}</li>
                )}
              </ul>
              <h3>Instructions:</h3>
              <ul>
                {Array.isArray(selectedRecipe.instructions) ? (
                  selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))
                ) : (
                  <li>{selectedRecipe.instructions}</li>
                )}
              </ul>
              <p>Time: {selectedRecipe.time || '50 minutes'}</p>
            </div>
          </div>
        ) : (
          <>
            <h1 className='CompanyName'>RecipeHive</h1>
            <h1> Stirring Up Delicious Discoveries! </h1>
            <hr></hr>
            <h1 className='Recipes'>Explore Recipes</h1>
            <div className='SearchBar'>
            {!showSignUp && !showSignIn && !showAddRecipe && (
            <>
              <input
                type="text"
                placeholder="Search the recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className='SignIn' onClick={handleSearch}>Search</button>
            </>
          )}
          </div>
            <div className="filter-buttons">
              
            </div>
            <div className="recipes-container">
              {filteredRecipes.map((recipe, index) => (
                <div
                  className="recipe-item"
                  key={index}
                  onClick={() => handleRecipeSelect(recipe)}
                >
                  <img src={images[recipe.title]} alt={recipe.title} />
                  <p><b>{recipe.title}</b></p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
