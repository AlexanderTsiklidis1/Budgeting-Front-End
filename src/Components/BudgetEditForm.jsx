import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
const API = import.meta.env.VITE_BASE_URL;

function BudgetEditForm() {
  
  let { index } = useParams();

  const [budget, setBudget] = useState({
    id: "",
    item_name: "",
    amount: "",
    date: "",
    from: "",
    category: "",
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
        <label htmlFor="id">ID:</label>
        <input
          id="id"
          value={budget.id}
          type="text"
          onChange={handleTextChange}
          placeholder="ID of Budget Item"
          required
        />
        <label htmlFor="Item-name">Budget Item-Name</label>
        <input
          id="item-name"
          type="text"
          value={budget.item_name}
          placeholder="Name of Budget Item"
          onChange={handleTextChange}
        />
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          value={budget.amount}
          placeholder="Budget Item Amount"
          onChange={handleTextChange}
        />
        <label htmlFor="Date">Date</label>
        <input
          id="Date"
          type="text"
          name="Date"
          value={budget.date}
          placeholder="YYYY-MM-DD"
          onChange={handleTextChange}
        />
        <label htmlFor="From">From</label>
        <input
          id="From"
          type="text"
          placeholder="Record Where Budget Item is From"
          onChange={handleCheckboxChange}
          checked={budget.from}
        />
        <label htmlFor="description">Category</label>
        <textarea
          id="Category"
          name="Category"
          value={budget.category}
          onChange={handleTextChange}
          placeholder="Describe the category of this Budget Item"
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
