import { useEffect, useState } from "react";
import Budget from "./Budget";
const API = import.meta.env.VITE_BASE_URL


function Budgets() {
  const [budgets, setBudgets] = useState([]);
  useEffect(()=> {
    fetch(`${API}/budgets`)
    .then((response) => response.json())
    .then( budgets => setBudgets(budgets))
    .catch(error => console.log(error))
  }, [])

  return (
    <div className="Budgets">
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Take me there</th>
              <th>See this Budget</th>
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
