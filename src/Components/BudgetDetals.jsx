import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_BASE_URL

function BudgetDetails() {
  const [budget, setBudget] = useState([]);
  let { index } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/budgets/${index}`)
    .then(response => response.json())
    .then(bookmark => {
      console.log(budget)
      setBudget(budget)
    })
    .catch(() => navigate("/not-found"))
  }, [index, navigate]);

  const handleDelete = () => {
    const httpOptions = { "method" : "DELETE" };

    // we know we need to delete a specific resource
    fetch(`${API}/budgets/${index}`, httpOptions)
      .then((res) => {
        console.log(res)
        alert("hey - budget was deleted!  Way to GO!");
        navigate('/budgets');
      })
      .catch((err) => console.error(err))
      // so we need to FETCH to our DB to make 
        // we need a  DELETE request
        // then once we've deleted we should reroute the user
        // and pobably let them know we deleted something
  };
  return (
    <article>
      <h3>
        {budget.isFavorite ? <span>⭐️</span> : null} {budget.name}
      </h3>
      <h5>
        <span>
          <a href={budget.url}>{budget.name}</a>
        </span>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {budget.url}
      </h5>
      <h6>{budget.category}</h6>
      <p>{budget.description}</p>
      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/budgets`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/budgets/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default BudgetDetails;
