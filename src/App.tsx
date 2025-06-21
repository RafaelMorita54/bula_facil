import { useState } from "react";
import "./App.css";

interface Medication {
  name: string;
  requiresPrescription: boolean;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("ibuprofeno");

  // Mock medication data
  const medications: Medication[] = [
    { name: "Ibuprofeno", requiresPrescription: false },
    { name: "Cetoprofeno", requiresPrescription: true },
    { name: "Nimesulida", requiresPrescription: true },
    { name: "Paracetamol", requiresPrescription: false },
    { name: "Diclofenaco", requiresPrescription: true },
  ];

  const getExactMatches = () => {
    return medications.filter(
      (med) => med.name.toLowerCase() === searchTerm.toLowerCase(),
    );
  };

  const getSimilarMedications = () => {
    return medications
      .filter(
        (med) =>
          med.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          med.name.toLowerCase() !== searchTerm.toLowerCase(),
      )
      .slice(0, 3);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="app-logo">📱</div>
          </div>
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-container">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar medicamento..."
                className="search-input"
              />
              <button type="submit" className="search-button">
                🔍
              </button>
            </div>
          </form>
          <button className="menu-button">☰</button>
        </div>
      </header>

      <main className="main-content">
        {/* Exact matches section */}
        <section className="medication-section">
          <h2 className="section-title">
            Medicamentos com nome "{searchTerm}"
          </h2>
          <div className="medication-list">
            {getExactMatches().length > 0 ? (
              getExactMatches().map((medication, index) => (
                <div key={index} className="medication-item">
                  <div className="medication-info">
                    <span className="medication-icon">💊</span>
                    <span className="medication-name">{medication.name}</span>
                  </div>
                  <span
                    className={`prescription-status ${!medication.requiresPrescription ? "no-prescription" : "requires-prescription"}`}
                  >
                    {medication.requiresPrescription
                      ? "Exige prescrição médica"
                      : "Não exige prescrição médica"}
                  </span>
                </div>
              ))
            ) : (
              <div className="no-results">
                <span>Nenhum Medicamento Encontrado</span>
              </div>
            )}
          </div>
        </section>

        {/* Similar medications section */}
        {getSimilarMedications().length > 0 && (
          <section className="medication-section">
            <h2 className="section-title">
              Medicamentos similares{" "}
              <span className="section-subtitle">(anti-inflamatórios)</span>
            </h2>
            <div className="medication-list">
              {getSimilarMedications().map((medication, index) => (
                <div key={index} className="medication-item">
                  <div className="medication-info">
                    <span className="medication-icon">💊</span>
                    <span className="medication-name">{medication.name}</span>
                  </div>
                  <span
                    className={`prescription-status ${!medication.requiresPrescription ? "no-prescription" : "requires-prescription"}`}
                  >
                    {medication.requiresPrescription
                      ? "Exige prescrição médica"
                      : "Não exige prescrição médica"}
                  </span>
                </div>
              ))}
              <div className="medication-item">
                <div className="medication-info">
                  <span className="medication-icon">💊</span>
                  <span className="medication-name">...</span>
                </div>
                <span></span>
              </div>
            </div>
          </section>
        )}

        {/* Symptoms section */}
        <section className="medication-section">
          <h2 className="section-title">
            Medicamentos para sintoma "{searchTerm}"
          </h2>
          <div className="medication-list">
            <div className="no-results">
              <span>Nenhum Medicamento Encontrado</span>
            </div>
          </div>
        </section>
      </main>

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

export default App;
