import React from "react";
import { Link } from "react-router-dom";

function Budget({ budget, index }) {
  return (
    <tr>
      <td>{budget.id}</td>
      <td>{budget.item_name}</td>
      <td>{budget.amount}</td>
      <td>{budget.date}</td>
      <td>{budget.from}</td>
      <td>{budget.category}</td>
      <td>
        <Link to={`/budgets/${index}`}>...</Link>
      </td>
    </tr>
  );
}

export default Budget;