import { useState } from "react";
import "./App.css";

interface Medication {
  name: string;
  dose: string;
  frequency: string;
}

interface Condition {
  name: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // User's medical conditions
  const conditions: Condition[] = [
    { name: "Asma" },
    { name: "Hipertensão" },
    { name: "Osteoartrite" },
  ];

  // User's current medications
  const medications: Medication[] = [
    { name: "Ibuprofeno", dose: "600mg", frequency: "24 horas" },
    { name: "Budesonida", dose: "200mcg", frequency: "12 horas" },
    { name: "Furosemida", dose: "40mg", frequency: "8 horas" },
  ];

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
                placeholder="Busque remédios, sintomas, doenças, substâncias..."
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
        <h1 className="page-title">Meu Painel</h1>

        {/* Alerts Section */}
        <section className="alerts-section">
          <div className="alert-card">
            <div className="alert-header">
              <span className="alert-icon">⚠️</span>
              <span className="alert-title">Alertas</span>
            </div>
            <p className="alert-message">
              O medicamento{" "}
              <a href="#" className="medication-link">
                ibuprofeno
              </a>{" "}
              não é indicado para quem possui Asma
            </p>
          </div>
        </section>

        {/* Known Conditions Section */}
        <section className="dashboard-section">
          <div className="section-card conditions-card">
            <h2 className="section-title">Doenças/Condições Conhecidas</h2>
            <ul className="conditions-list">
              {conditions.map((condition, index) => (
                <li key={index} className="condition-item">
                  <span className="condition-bullet">•</span>
                  <span className="condition-name">{condition.name}</span>
                </li>
              ))}
            </ul>
            <button className="manage-button">
              Gerenciar Doenças/Condições
            </button>
          </div>
        </section>

        {/* My Medications Section */}
        <section className="dashboard-section">
          <div className="section-card medications-card">
            <h2 className="section-title">Meus Remédios</h2>
            <div className="medications-table-container">
              <table className="medications-table">
                <thead>
                  <tr>
                    <th>Remédio</th>
                    <th>Dose</th>
                    <th>Frequência</th>
                  </tr>
                </thead>
                <tbody>
                  {medications.map((medication, index) => (
                    <tr key={index}>
                      <td className="medication-name-cell">
                        <a href="#" className="medication-link">
                          {medication.name}
                        </a>
                      </td>
                      <td>{medication.dose}</td>
                      <td>{medication.frequency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="manage-button">Gerenciar Remédios</button>
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
