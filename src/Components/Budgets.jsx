import React, { useEffect, useState } from "react";
import Budget from "./Budget";

const API = import.meta.env.VITE_BASE_URL;

function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0); 

  useEffect(() => {
    fetch(`${API}budgets`)
      .then((response) => response.json())
      .then((budgets) => {
        setBudgets(budgets);
        
       
        const liveTotalBudget = budgets.reduce((total, budget) => total + budget.amount, 0);
        setTotalBudget(liveTotalBudget);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="home-container">
      <h1>Total Budget: ${totalBudget.toFixed(2)}</h1>
      <section>
        <table>
          <thead>
            <tr>
              <th className="underline">ID</th>
              <th className="underline">Budget Item Name</th>
              <th className="underline">Amount</th>
              <th className="underline">Date</th>
              <th className="underline">From</th>
              <th className="underline">Category</th>
              <th className="underline">Details</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget, index) => {
              return <Budget key={index} budget={budget} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Budgets;
