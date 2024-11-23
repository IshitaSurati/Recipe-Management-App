import React from "react";


const Navbar = () => {
  return (
    <nav class="navbar">
       <a href="/" class="logo">MyApp</a>

<div class="menu-toggle" id="menuToggle">
  &#9776;
</div>
      <div class="links" id="navbarLinks">
        <a href="/" className="nav-link">Home</a>
        <a href="/login" className="nav-link">Login</a>
        <a href="/register" className="nav-link">Register</a>
        <a href="/profile" className="nav-link">Profile</a>
        <a href="/add-recipe" className="nav-link">Add Recipe</a>
      </div>
    </nav>
  );
};

export default Navbar;
