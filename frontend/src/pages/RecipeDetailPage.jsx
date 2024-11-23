import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetailPage = () => {
  const { id } = useParams(); // Get recipe ID from URL parameters
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);  // Set loading to true before fetching
      try {
        const response = await fetch(`http://localhost:5001/api/recipes/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe details');
        }
        const data = await response.json();
        setRecipe(data);
        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <div className="recipe-detail-container">
      <h2>{recipe.title}</h2>
      <img
        src={recipe.image || "https://via.placeholder.com/150"}
        alt={recipe.title}
        className="recipe-image"
      />
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients?.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetailPage;
