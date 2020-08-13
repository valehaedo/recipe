import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';


const App = () => {
  const APP_ID = 'f8d38bdf';
  const APP_KEY = '95d22177c221bdefb5c4ea175f2753e0';
  const [query, setQuery] = useState('chicken')

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');


  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits)
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="serch-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipes => (
        <Recipe key={recipes.recipe.label}
        title={recipes.recipe.label} calories={recipes.recipe.calories}
        image={recipes.recipe.image} ingredients={recipes.recipe.ingredients}
        />
        ))}
        </div>
    </div>
  );
}

export default App;
