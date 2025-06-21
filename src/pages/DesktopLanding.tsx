import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DesktopLanding() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/search?q=ibuprofeno");
    }
  };

  const handleGetStarted = () => {
    navigate("/search?q=ibuprofeno");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleQuickSearch = (
    term: string,
    type: "medicine" | "symptom" = "medicine",
  ) => {
    navigate(`/search?q=${encodeURIComponent(term)}&type=${type}`);
  };

  return (
    <div className="desktop-landing">
      <div className="landing-hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Consulte Medicamentos com{" "}
              <span className="highlight">Segurança</span>
            </h1>
            <p className="hero-description">
              Encontre informações confiáveis sobre medicamentos, verifique
              interações e gerencie seus remédios de forma simples e segura.
            </p>

            <form className="hero-search-form" onSubmit={handleSearch}>
              <div className="hero-search-container">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Busque por medicamentos, sintomas ou doenças..."
                  className="hero-search-input"
                />
                <button type="submit" className="hero-search-button">
                  🔍 Buscar
                </button>
              </div>
            </form>

            <div className="quick-actions">
              <button
                className="quick-action-btn primary"
                onClick={handleGetStarted}
              >
                Começar Busca
              </button>
              <button
                className="quick-action-btn secondary"
                onClick={handleDashboard}
              >
                Meu Painel
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-icon-large">🏥</div>
            <div className="floating-pills">
              <div className="pill pill-1">💊</div>
              <div className="pill pill-2">🩺</div>
              <div className="pill pill-3">⚕️</div>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2 className="section-title">Como podemos ajudar você</h2>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💊</div>
              <h3>Buscar Medicamentos</h3>
              <p>
                Encontre informações detalhadas sobre qualquer medicamento,
                incluindo composição, usos e contraindicações.
              </p>
              <div className="feature-actions">
                <button
                  className="feature-btn"
                  onClick={() => handleQuickSearch("ibuprofeno")}
                >
                  Buscar Ibuprofeno
                </button>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤒</div>
              <h3>Buscar por Sintomas</h3>
              <p>
                Digite seus sintomas e encontre medicamentos que podem ajudar no
                tratamento.
              </p>
              <div className="feature-actions">
                <button
                  className="feature-btn"
                  onClick={() => handleQuickSearch("dor de cabeça", "symptom")}
                >
                  Buscar Dor de Cabeça
                </button>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚠️</div>
              <h3>Verificar Interações</h3>
              <p>
                Verifique possíveis conflitos entre medicamentos e suas
                condições de saúde.
              </p>
              <div className="feature-actions">
                <button className="feature-btn" onClick={handleDashboard}>
                  Ver Meu Painel
                </button>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Gerenciar Remédios</h3>
              <p>
                Mantenha um controle organizado dos seus medicamentos pessoais e
                receba alertas.
              </p>
              <div className="feature-actions">
                <button className="feature-btn" onClick={handleDashboard}>
                  Gerenciar Lista
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-search-section">
        <div className="container">
          <h2 className="section-title">Buscas Populares</h2>

          <div className="search-categories">
            <div className="search-category">
              <h3>Medicamentos Populares</h3>
              <div className="search-tags">
                <button
                  className="search-tag"
                  onClick={() => handleQuickSearch("ibuprofeno")}
                >
                  Ibuprofeno
                </button>
                <button
                  className="search-tag"
                  onClick={() => handleQuickSearch("paracetamol")}
                >
                  Paracetamol
                </button>
                <button
                  className="search-tag"
                  onClick={() => handleQuickSearch("dipirona")}
                >
                  Dipirona
                </button>
                <button
                  className="search-tag"
                  onClick={() => handleQuickSearch("omeprazol")}
                >
                  Omeprazol
                </button>
              </div>
            </div>

            <div className="search-category">
              <h3>Sintomas Comuns</h3>
              <div className="search-tags">
                <button
                  className="search-tag"
                  onClick={() => handleQuickSearch("dor de cabeça", "symptom")}
                >
                  Dor de Cabeça
                </button>
                <button
                  className="search-tag"
                  onClick={() => handleQuickSearch("febre", "symptom")}
                >
                  Febre
                </button>
                <button
                  className="search-tag"
                  onClick={() => handleQuickSearch("dor muscular", "symptom")}
                >
                  Dor Muscular
                </button>
                <button
                  className="search-tag"
                  onClick={() => handleQuickSearch("náusea", "symptom")}
                >
                  Náusea
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Pronto para começar?</h2>
            <p>
              Encontre as informações que você precisa sobre medicamentos de
              forma rápida e confiável.
            </p>
            <div className="cta-actions">
              <button className="cta-btn primary" onClick={handleGetStarted}>
                Fazer Primeira Busca
              </button>
              <button className="cta-btn secondary" onClick={handleDashboard}>
                Acessar Meu Painel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopLanding;
