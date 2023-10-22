import { Link } from "react-router-dom";

function Budget({ budget, index }) {
  return (
    <tr>
      <td>
        {budget.isFavorite ? (
          <span>⭐️</span>
        ) : (
          <span>&nbsp; &nbsp; &nbsp;</span>
        )}
      </td>
      <td style={{ cursor: "alias" }}>
        <a href={budget.url} target="_blank" rel="noreferrer">
          {budget.name}
        </a>
      </td>
      <td>
        <Link to={`/budgets/${index}`}>✏️</Link>
      </td>
    </tr>
  );
}

export default Budget;