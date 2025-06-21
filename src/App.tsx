import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import DesktopLanding from "./pages/DesktopLanding";
import SearchMenu from "./pages/SearchMenu";
import DesktopSearchMenu from "./pages/DesktopSearchMenu";
import SearchResults from "./pages/SearchResults";
import MedicationDetails from "./pages/MedicationDetails";
import EnhancedMedicationDetails from "./pages/EnhancedMedicationDetails";
import Dashboard from "./pages/Dashboard";
import EnhancedDashboard from "./pages/EnhancedDashboard";
import DesktopEnhancedDashboard from "./pages/DesktopEnhancedDashboard";
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
            {/* Fallback routes */}
            <Route path="/landing" element={<Landing />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      ) : (
        // Desktop Routes - With shared layout
        <Layout>
          <Routes>
            <Route path="/" element={<DesktopLanding />} />
            <Route path="/search-menu" element={<DesktopSearchMenu />} />
            <Route path="/search" element={<SearchResults />} />
            <Route
              path="/medication/:medicationName"
              element={<EnhancedMedicationDetails />}
            />
            <Route path="/dashboard" element={<DesktopEnhancedDashboard />} />
            {/* Legacy routes for backward compatibility */}
            <Route path="/landing" element={<DesktopLanding />} />
            {/* Fallback route - redirect any unknown paths to landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      )}
    </Router>
  );
}

export default App;
