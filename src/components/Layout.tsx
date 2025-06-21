import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogoClick = () => {
    // Always go to landing page when logo is clicked
    navigate("/");
  };

  const handleMenuClick = () => {
    if (location.pathname === "/") {
      navigate("/search-menu");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div
              className="app-logo"
              onClick={handleLogoClick}
              style={{ cursor: "pointer" }}
            >
              📱
            </div>
          </div>
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-container">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Busque remédios, sintomas, doenças, substâncias..."
                className="search-input"
              />
              <button type="submit" className="search-button">
                🔍
              </button>
            </div>
          </form>
          <button className="menu-button" onClick={handleMenuClick}>
            ☰
          </button>
        </div>
      </header>

      <main className="main-content">{children}</main>

      <footer className="footer">
        <div className="footer-links">
          <a href="#" className="footer-link">
            Quem somos
          </a>
          <a href="#" className="footer-link">
            Privacidade
          </a>
          <a href="#" className="footer-link">
            Termos e condições
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
