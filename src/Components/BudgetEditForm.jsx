import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
const API = import.meta.env.VITE_BASE_URL;
// if we need to edit something - we need the value it has curently;
   // what kind of req do we need to make for that?

function BudgetEditForm() {
  // why are we grabbing index? we  need top grab a SPECIFIC bookmark
  let { index } = useParams();

  const [budget, setBudget] = useState({
    name: "",
    url: "",
    category: "",
    description: "",
    isFavorite: false,
  });
  const navigate = useNavigate(); 
  const handleTextChange = (event) => {
    setBudget({ ...budget, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setBudget({ ...budget, isFavorite: !budget.isFavorite });
  };

  useEffect(() => {
    fetch(`${API}/budgets/${index}`)
      .then(response => response.json())
      .then(bookmark => {
        console.log(budget)
        setBudget(budget)
    })
    .catch(() => navigate("/not-found"))
  }, [index, navigate]);

  const updateBudget = () => {
    // our config for the fetch
    const httpOptions = {
      "method" : "PUT",
      "body" : JSON.stringify(budget),
      "headers" : {
        "Content-type" : "application/json"
      }
    }

      fetch(`${API}/budgets/${index}`, httpOptions)
        .then(() => { 
          alert(`${budget.name} has been updated!`);
          navigate(`/budgets/${index}`)
        })
        .catch((err) => console.error(err))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    updateBudget();
  };
  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={budget.name}
          type="text"
          onChange={handleTextChange}
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
      <Link to={`/budgets/${index}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default BudgetEditForm;
