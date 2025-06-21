import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import SearchResults from "./pages/SearchResults";
import MedicationDetails from "./pages/MedicationDetails";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/search?q=ibuprofeno" replace />}
          />
          <Route path="/search" element={<SearchResults />} />
          <Route
            path="/medication/:medicationName"
            element={<MedicationDetails />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
