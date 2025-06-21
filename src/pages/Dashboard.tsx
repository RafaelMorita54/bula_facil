import { useNavigate } from "react-router-dom";

interface Medication {
  name: string;
  dose: string;
  frequency: string;
}

interface Condition {
  name: string;
}

function Dashboard() {
  const navigate = useNavigate();

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

  const handleMedicationClick = (medicationName: string) => {
    navigate(`/medication/${medicationName.toLowerCase()}`);
  };

  return (
    <>
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
            <span
              className="medication-link clickable"
              onClick={() => handleMedicationClick("ibuprofeno")}
            >
              ibuprofeno
            </span>{" "}
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
          <button className="manage-button">Gerenciar Doenças/Condições</button>
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
                      <span
                        className="medication-link clickable"
                        onClick={() => handleMedicationClick(medication.name)}
                      >
                        {medication.name}
                      </span>
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
    </>
  );
}

export default Dashboard;
