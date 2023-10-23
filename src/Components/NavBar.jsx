import React from 'react';
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar">
      <button>
        <Link to="/budgets" className="nav-link">Budgets</Link>
      </button>
      <button>
        <Link to="/budgets/new" className="nav-link">New Budget</Link>
      </button>
      <button>
        <Link to="/" className="nav-link">Home</Link>
      </button>
    </nav>
  );
}