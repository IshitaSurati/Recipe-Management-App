import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch("http://localhost:5001/api/recipes/", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized! Please log in.");
        } else {
          throw new Error(`Failed to fetch recipes: ${response.statusText}`);
        }
      }

      const data = await response.json();
      setRecipes(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`http://localhost:5001/api/recipes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (response.ok) {
        setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
      } else {
        throw new Error("Failed to delete recipe.");
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // Navigate to edit page with the recipe ID
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (error) {
    return (
      <div className="container mt-16 text-center">
        <h1 className="text-3xl font-bold text-red-500">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-16">
      <h1 className="text-3xl font-bold text-center mb-8">Recipes</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="card">
            <img
              src={recipe.image || "https://via.placeholder.com/150"}
              alt={recipe.title}
              className="card-image"
            />
            <h3 className="card-title">{recipe.title}</h3>
            <p className="card-description">
              {recipe.instructions.slice(0, 100)}...
            </p>
            <div className="card-footer">
              <button
                className="button-secondary"
                onClick={() => handleEdit(recipe._id)}
              >
                Edit
              </button>
              <button
                className="button-danger"
                onClick={() => handleDelete(recipe._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
