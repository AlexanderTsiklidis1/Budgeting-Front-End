import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_BASE_URL;

function BudgetDetails() {
  const [budget, setBudget] = useState({});
  const { index } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}budgets/${index}`)
      .then((response) => response.json())
      .then((fetchedBudget) => {
        setBudget(fetchedBudget);
      })
      .catch(() => navigate("/not-found"));
  }, [index, navigate]);

  const handleDelete = () => {
    const httpOptions = { method: "DELETE" };

    fetch(`${API}/budgets/${index}`, httpOptions)
      .then((res) => {
        console.log(res);
        alert("Budget was deleted successfully!");
        navigate('/budgets');
      })
      .catch((err) => console.error(err));
  };

  return (
    <article className="home-container">
      <h3 className="welcome-heading">
        {budget.item_name}
      </h3>
      <h5 className="app-heading">
        Amount: {budget.amount}
      </h5>
      <h6 className="app-heading">
        Date: {budget.date}
      </h6>
      <p className="app-heading">
        From: {budget.from}
      </p>
      <p className="app-heading">
        Category: {budget.category}
      </p>
      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/budgets`}>
            <button className="button">Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/budgets/${index}/edit`}>
            <button className="button" style={{ padding: "10px" }}>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete} className="button" style={{ padding: "10px" }}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default BudgetDetails;