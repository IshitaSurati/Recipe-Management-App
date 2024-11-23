import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipePage = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();

    formData.append("title", title);
    formData.append("instructions", instructions);
    formData.append("ingredients", ingredients); // added ingredients
    if (image) formData.append("image", image);

    const response = await fetch("http://localhost:5001/api/recipes/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
    });

    if (response.ok) {
      navigate("/");
    }
  };

  return (
    <div className="form">
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />

        <input
          type="url"
          placeholder="Enter Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipePage;
