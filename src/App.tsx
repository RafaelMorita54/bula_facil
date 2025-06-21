import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import SearchMenu from "./pages/SearchMenu";
import SearchResults from "./pages/SearchResults";
import MedicationDetails from "./pages/MedicationDetails";
import EnhancedMedicationDetails from "./pages/EnhancedMedicationDetails";
import Dashboard from "./pages/Dashboard";
import EnhancedDashboard from "./pages/EnhancedDashboard";
import "./App.css";

function App() {
  // Check if it's mobile based on screen size or user agent
  const isMobile =
    window.innerWidth <= 768 ||
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  return (
    <Router>
      {isMobile ? (
        // Mobile Routes - Full screen without shared layout
        <div className="mobile-app">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/search-menu" element={<SearchMenu />} />
            <Route
              path="/search"
              element={
                <Layout>
                  <SearchResults />
                </Layout>
              }
            />
            <Route
              path="/medication/:medicationName"
              element={
                <Layout>
                  <EnhancedMedicationDetails />
                </Layout>
              }
            />
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <EnhancedDashboard />
                </Layout>
              }
            />
          </Routes>
        </div>
      ) : (
        // Desktop Routes - With shared layout
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/search?q=ibuprofeno" replace />}
            />
            <Route
              path="/search-menu"
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
      )}
    </Router>
  );
}

export default App;
