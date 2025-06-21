import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/search-menu");
  };

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleSearch = () => {
    navigate("/search-menu");
  };

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    alert("Usuário desconectado");
    setShowMenu(false);
  };

  return (
    <div className="mobile-landing">
      <header className="landing-header">
        <div className="landing-header-content">
          <div className="app-logo">📱</div>
          <h1 className="app-title">MediConsulta</h1>
          <button className="menu-button" onClick={handleMenuToggle}>
            ☰
          </button>
        </div>
      </header>

      {showMenu && (
        <div className="landing-menu-overlay">
          <div className="landing-menu">
            <div className="menu-header">
              <h3>Menu</h3>
              <button className="menu-close" onClick={handleMenuToggle}>
                ×
              </button>
            </div>
            <div className="menu-items">
              <button className="menu-item" onClick={handleSearch}>
                🔍 Buscar Medicamentos
              </button>
              <button className="menu-item" onClick={handleDashboard}>
                📊 Meu Painel
              </button>
              <button className="menu-item">❓ Ajuda</button>
              <button className="menu-item">⚙️ Configurações</button>
              <button className="menu-item logout" onClick={handleLogout}>
                🚪 Sair
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="landing-main">
        <div className="landing-hero">
          <div className="hero-icon">🏥</div>
          <h2 className="hero-title">Consulte Medicamentos com Segurança</h2>
          <p className="hero-description">
            Encontre informações confiáveis sobre medicamentos, verifique
            interações e gerencie seus remédios de forma simples e segura.
          </p>
          <button className="cta-button" onClick={handleGetStarted}>
            Começar Busca
          </button>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💊</div>
            <h3>Buscar Medicamentos</h3>
            <p>Encontre informações detalhadas sobre qualquer medicamento</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚠️</div>
            <h3>Verificar Interações</h3>
            <p>Verifique possíveis conflitos com suas condições de saúde</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Gerenciar Remédios</h3>
            <p>Mantenha um controle dos seus medicamentos pessoais</p>
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        <div className="footer-links">
          <a href="#" className="footer-link">
            Sobre
          </a>
          <a href="#" className="footer-link">
            Privacidade
          </a>
          <a href="#" className="footer-link">
            Termos
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
