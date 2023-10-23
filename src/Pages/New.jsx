import BudgetNewForm from "../Components/BudgetNewForm";

function New() {
  return (
    <div className="new-budget-form">
      <h2 className="welcome-heading">Create a New Budget Item</h2>
      <BudgetNewForm />
    </div>
  );
}

export default New;