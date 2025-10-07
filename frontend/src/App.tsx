import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import VehiclesPage from "./pages/VehiclesPage";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router basename="/evaluation">
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
      </Routes>
    </Router>
  );
};
export default App;
