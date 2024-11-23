import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditRecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await fetch(`http://localhost:5001/api/recipes/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Recipe not found");
          }
          throw new Error(`Failed to fetch recipe: ${response.statusText}`);
        }

        const data = await response.json();
        setRecipe(data);
        setTitle(data.title);
        setInstructions(data.instructions);
        setImage(data.image || "");
      } catch (err) {
        console.error(err);
        alert(err.message); // Show a friendly error message to the user
      }
    };

    fetchRecipe();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`http://localhost:5001/api/recipes/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          instructions,
          image,
        }),
      });

      if (response.ok) {
        navigate("/"); // Navigate back to home page after updating
      } else {
        throw new Error("Failed to update recipe.");
      }
    } catch (err) {
      console.error(err);
      alert(err.message); // Handle the error and show an alert
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-16">
      <h1 className="text-3xl font-bold text-center mb-8">Edit Recipe</h1>
      <form onSubmit={handleUpdate} className="form">
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default EditRecipePage;
