import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { VehiclePage } from "./pages/VehiclePage";

const App = () => {
  return (
    <Router basename="/evaluation">
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/vehicles" element={<VehiclePage />} />
      </Routes>
    </Router>
  );
};
export default App;
