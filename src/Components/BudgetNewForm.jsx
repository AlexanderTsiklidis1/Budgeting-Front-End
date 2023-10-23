import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_BASE_URL;

function BudgetNewForm() {
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

  const addBudget = () => {
    const httpOptions = {
      method: "POST",
      body: JSON.stringify(budget),
      headers: {
        "Content-type": "application/json",
      },
    };
    fetch(`${API}/budgets`, httpOptions)
      .then((res) => {
        console.log(res);
        alert(`${budget.item_name} was added to the database!`);
        navigate("/budgets");
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addBudget();
  };

  return (
    <div className="new-budget-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID</label>
        <input
          id="id"
          value={budget.id}
          type="text"
          onChange={handleTextChange}
          placeholder="Id of budget item"
          required
        />
        <label htmlFor="item_name">Budget Item Name</label>
        <input
          id="item_name"
          type="text"
          value={budget.item_name}
          onChange={handleTextChange}
          placeholder="Name of Budget Item"
          required
        />
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          value={budget.amount}
          placeholder="Budget Item Amount"
          onChange={handleTextChange}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="text"
          name="Date"
          value={budget.date}
          placeholder="YYYY-MM-DD"
          onChange={handleTextChange}
        />
        <label htmlFor="from">From</label>
        <input
          id="from"
          type="text"
          onChange={handleTextChange}
          value={budget.from}
        />
        <label htmlFor="category">Category</label>
        <textarea
          id="category"
          name="Category"
          value={budget.category}
          onChange={handleTextChange}
          placeholder="Describe the category of budget-item"
        />
        <br />
        <input type="submit" className="submit-button" />
      </form>
    </div>
  );
}

export default BudgetNewForm;