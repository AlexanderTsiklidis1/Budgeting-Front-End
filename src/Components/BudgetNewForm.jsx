import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_BASE_URL

function BudgetNewForm() {
  const [budget, setBudget] = useState({
    name: "",
    url: "",
    category: "",
    isFavorite: false,
    description: "",
  });

  const navigate = useNavigate();
  const handleTextChange = (event) => {
    
    setBudget({ ...bookmark, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setBudget({ ...bookmark, isFavorite: !bookmark.isFavorite });
  };

  const addBudget = () => {
   
    const httpOptions = {
      "method" : "POST",
      "body" : JSON.stringify(budget),
      "headers" : {
        "Content-type" : "application/json"
      }
    }
    fetch(`${API}/budgets`, httpOptions)
      .then((res) => {
        console.log(res)
        alert(`${budget.name} was added to the database!`);
        navigate('/budgets');
      })
      .catch((err) => console.error(err))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addBudget();
  };
  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={budget.name}
          type="text"
          onChange={ handleTextChange }
          placeholder="Name of Website"
          required
        />
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          type="text"
          pattern="http[s]*://.+"
          required
          value={budget.url}
          placeholder="http://"
          onChange={handleTextChange}
        />
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          name="category"
          value={budget.category}
          placeholder="educational, inspirational, ..."
          onChange={handleTextChange}
        />
        <label htmlFor="isFavorite">Favorite:</label>
        <input
          id="isFavorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={budget.isFavorite}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={budget.description}
          onChange={handleTextChange}
          placeholder="Describe why you bookmarked this site"
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default BudgetNewForm;
