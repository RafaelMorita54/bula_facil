import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchMenu() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleMedicineSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}&type=medicine`);
    } else {
      navigate("/search?q=ibuprofeno&type=medicine");
    }
  };

  const handleSymptomSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}&type=symptom`);
    } else {
      navigate("/search?q=dor de cabeça&type=symptom");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="search-menu-page">
      <header className="search-menu-header">
        <button className="back-button" onClick={handleBack}>
          ←
        </button>
        <h1>Tipo de Busca</h1>
        <div></div>
      </header>

      <main className="search-menu-main">
        <div className="search-input-section">
          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite o que deseja buscar..."
              className="search-input"
            />
          </div>
        </div>

        <div className="search-options">
          <h2>O que você deseja buscar?</h2>

          <div className="search-option-cards">
            <button
              className="search-option-card"
              onClick={handleMedicineSearch}
            >
              <div className="option-icon">💊</div>
              <div className="option-content">
                <h3>Buscar Remédio</h3>
                <p>Encontre informações sobre medicamentos específicos</p>
              </div>
              <div className="option-arrow">→</div>
            </button>

            <button
              className="search-option-card"
              onClick={handleSymptomSearch}
            >
              <div className="option-icon">🤒</div>
              <div className="option-content">
                <h3>Buscar por Sintoma</h3>
                <p>Encontre medicamentos para tratar sintomas específicos</p>
              </div>
              <div className="option-arrow">→</div>
            </button>
          </div>

          <div className="quick-searches">
            <h3>Buscas Rápidas</h3>
            <div className="quick-search-tags">
              <button
                className="quick-tag"
                onClick={() => {
                  setSearchTerm("ibuprofeno");
                  handleMedicineSearch();
                }}
              >
                Ibuprofeno
              </button>
              <button
                className="quick-tag"
                onClick={() => {
                  setSearchTerm("paracetamol");
                  handleMedicineSearch();
                }}
              >
                Paracetamol
              </button>
              <button
                className="quick-tag"
                onClick={() => {
                  setSearchTerm("dor de cabeça");
                  handleSymptomSearch();
                }}
              >
                Dor de Cabeça
              </button>
              <button
                className="quick-tag"
                onClick={() => {
                  setSearchTerm("febre");
                  handleSymptomSearch();
                }}
              >
                Febre
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SearchMenu;
