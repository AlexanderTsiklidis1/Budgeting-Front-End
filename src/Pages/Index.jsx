import Budgets from "../Components/Budgets";
const API = import.meta.env.VITE_BASE_URL;



function Index() {
  return (
    <div className="home-container">
      <h2 className="welcome-heading">Index</h2>
      <Budgets />
    </div>
  );
}

export default Index;