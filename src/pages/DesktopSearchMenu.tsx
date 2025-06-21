import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DesktopSearchMenu() {
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

  const handleQuickSearch = (term: string, type: "medicine" | "symptom") => {
    navigate(`/search?q=${encodeURIComponent(term)}&type=${type}`);
  };

  return (
    <div className="desktop-search-menu">
      <div className="search-menu-header">
        <div className="container">
          <h1 className="page-title">Escolha o Tipo de Busca</h1>
          <p className="page-subtitle">
            Selecione como você gostaria de buscar informações sobre
            medicamentos
          </p>
        </div>
      </div>

      <div className="search-menu-content">
        <div className="container">
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

          <div className="search-options-grid">
            <div className="search-option-card" onClick={handleMedicineSearch}>
              <div className="option-header">
                <div className="option-icon">💊</div>
                <h3>Buscar Remédio</h3>
              </div>
              <p>Encontre informações sobre medicamentos específicos</p>
              <div className="option-features">
                <ul>
                  <li>Composição e indicações</li>
                  <li>Contraindicações</li>
                  <li>Efeitos colaterais</li>
                  <li>Prescrição médica</li>
                </ul>
              </div>
              <button className="option-button">Buscar Medicamento</button>
            </div>

            <div className="search-option-card" onClick={handleSymptomSearch}>
              <div className="option-header">
                <div className="option-icon">🤒</div>
                <h3>Buscar por Sintoma</h3>
              </div>
              <p>Encontre medicamentos para tratar sintomas específicos</p>
              <div className="option-features">
                <ul>
                  <li>Medicamentos indicados</li>
                  <li>Opções sem receita</li>
                  <li>Tratamentos alternativos</li>
                  <li>Recomendações gerais</li>
                </ul>
              </div>
              <button className="option-button">Buscar por Sintoma</button>
            </div>
          </div>

          <div className="quick-searches-section">
            <div className="quick-search-grid">
              <div className="quick-search-category">
                <h3>Medicamentos Populares</h3>
                <div className="quick-search-tags">
                  <button
                    className="quick-tag"
                    onClick={() => handleQuickSearch("ibuprofeno", "medicine")}
                  >
                    Ibuprofeno
                  </button>
                  <button
                    className="quick-tag"
                    onClick={() => handleQuickSearch("paracetamol", "medicine")}
                  >
                    Paracetamol
                  </button>
                  <button
                    className="quick-tag"
                    onClick={() => handleQuickSearch("dipirona", "medicine")}
                  >
                    Dipirona
                  </button>
                  <button
                    className="quick-tag"
                    onClick={() => handleQuickSearch("omeprazol", "medicine")}
                  >
                    Omeprazol
                  </button>
                  <button
                    className="quick-tag"
                    onClick={() => handleQuickSearch("loratadina", "medicine")}
                  >
                    Loratadina
                  </button>
                  <button
                    className="quick-tag"
                    onClick={() => handleQuickSearch("amoxicilina", "medicine")}
                  >
                    Amoxicilina
                  </button>
                </div>
              </div>

              <div className="quick-search-category">
                <h3>Sintomas Comuns</h3>
                <div className="quick-search-tags">
                  <button
                    className="quick-tag"
                    onClick={() =>
                      handleQuickSearch("dor de cabeça", "symptom")
                    }
                  >
                    Dor de Cabeça
                  </button>
                  <button
                    className="quick-tag"
                    onClick={() => handleQuickSearch("febre", "symptom")}
                  >
                    Febre
                  </button>
                  <button
                    className="quick-tag"
                    onClick={() => handleQuickSearch("dor muscular", "symptom")}
                  >
                    Dor Muscular
                  </button>
                  <button
                    className="quick-tag"
                    onClick={() => handleQuickSearch("náusea", "symptom")}
                  >
                    Náusea
                  </button>
                  <button
                    className="quick-tag"
                    onClick={() => handleQuickSearch("tosse", "symptom")}
                  >
                    Tosse
                  </button>
                  <button
                    className="quick-tag"
                    onClick={() => handleQuickSearch("alergia", "symptom")}
                  >
                    Alergia
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="search-tips">
            <h3>Dicas de Busca</h3>
            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-icon">💡</div>
                <h4>Seja Específico</h4>
                <p>
                  Use o nome completo do medicamento ou sintoma específico para
                  melhores resultados.
                </p>
              </div>
              <div className="tip-card">
                <div className="tip-icon">🔍</div>
                <h4>Use Sinônimos</h4>
                <p>
                  Tente diferentes termos se não encontrar o que procura (ex:
                  "dor de cabeça" ou "cefaleia").
                </p>
              </div>
              <div className="tip-card">
                <div className="tip-icon">⚕️</div>
                <h4>Consulte um Médico</h4>
                <p>
                  Sempre consulte um profissional de saúde antes de iniciar
                  qualquer tratamento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopSearchMenu;
