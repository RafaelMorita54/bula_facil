import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RemoveMedicationDialog from "../components/RemoveMedicationDialog";

interface Medication {
  name: string;
  dose: string;
  frequency: string;
  duration: string;
  notes?: string;
}

interface Condition {
  name: string;
}

function EnhancedDashboard() {
  const navigate = useNavigate();
  const [medications, setMedications] = useState<Medication[]>([
    {
      name: "Ibuprofeno",
      dose: "600mg",
      frequency: "24 horas",
      duration: "7 dias",
    },
    {
      name: "Budesonida",
      dose: "200mcg",
      frequency: "12 horas",
      duration: "Uso contínuo",
    },
    {
      name: "Furosemida",
      dose: "40mg",
      frequency: "8 horas",
      duration: "30 dias",
    },
  ]);

  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [medicationToRemove, setMedicationToRemove] = useState<string>("");
  const [showManageMedications, setShowManageMedications] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const conditions: Condition[] = [
    { name: "Asma" },
    { name: "Hipertensão" },
    { name: "Osteoartrite" },
  ];

  const handleMedicationClick = (medicationName: string) => {
    navigate(`/medication/${medicationName.toLowerCase()}`);
  };

  const handleRemoveMedication = (medicationName: string) => {
    setMedicationToRemove(medicationName);
    setShowRemoveDialog(true);
  };

  const confirmRemoveMedication = () => {
    setMedications((prev) =>
      prev.filter((med) => med.name !== medicationToRemove),
    );
    setShowRemoveDialog(false);
    setMedicationToRemove("");
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleManageMedications = () => {
    setShowManageMedications(!showManageMedications);
  };

  const renderEmptyState = () => (
    <div className="empty-dashboard">
      <div className="empty-icon">📋</div>
      <h2>Nenhum medicamento adicionado</h2>
      <p>
        Comece adicionando seus medicamentos para ter um controle melhor do seu
        tratamento.
      </p>
      <button
        className="add-first-medication"
        onClick={() => navigate("/search-menu")}
      >
        Adicionar Primeiro Medicamento
      </button>
    </div>
  );

  const renderMedicationManagement = () => (
    <div className="medication-management">
      <div className="management-header">
        <h3>Gerenciar Medicamentos</h3>
        <button
          className="close-management"
          onClick={() => setShowManageMedications(false)}
        >
          ×
        </button>
      </div>

      <div className="medication-list-management">
        {medications.map((medication, index) => (
          <div key={index} className="medication-management-item">
            <div className="medication-info">
              <h4>{medication.name}</h4>
              <p>
                {medication.dose} - {medication.frequency}
              </p>
              <span className="duration-badge">{medication.duration}</span>
            </div>
            <div className="medication-actions">
              <button
                className="edit-button"
                onClick={() => handleMedicationClick(medication.name)}
              >
                ✏️
              </button>
              <button
                className="remove-button"
                onClick={() => handleRemoveMedication(medication.name)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="add-medication-button"
        onClick={() => navigate("/search-menu")}
      >
        + Adicionar Novo Medicamento
      </button>
    </div>
  );

  if (medications.length === 0) {
    return (
      <div className="dashboard-container">
        <h1 className="page-title">Meu Painel</h1>
        {renderEmptyState()}
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1 className="page-title">Meu Painel</h1>

      {showSuccessMessage && (
        <div className="success-message">
          <span className="success-icon">✅</span>
          Medicamento removido com sucesso!
        </div>
      )}

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
          <div className="medications-header">
            <h2 className="section-title">Meus Remédios</h2>
            <button
              className="quick-manage-button"
              onClick={handleManageMedications}
            >
              ⚙️
            </button>
          </div>

          {!showManageMedications ? (
            <>
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
                            onClick={() =>
                              handleMedicationClick(medication.name)
                            }
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
              <button
                className="manage-button"
                onClick={handleManageMedications}
              >
                Gerenciar Remédios
              </button>
            </>
          ) : (
            renderMedicationManagement()
          )}
        </div>
      </section>

      <RemoveMedicationDialog
        isOpen={showRemoveDialog}
        onClose={() => setShowRemoveDialog(false)}
        medicationName={medicationToRemove}
        onRemove={confirmRemoveMedication}
      />
    </div>
  );
}

export default EnhancedDashboard;
