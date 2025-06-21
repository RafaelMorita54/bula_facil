import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MedicineService } from "../services/MedicineService";
import { Medicine } from "../models/Medicine";
import RemoveMedicationDialog from "../components/RemoveMedicationDialog";

function DesktopEnhancedDashboard() {
  const navigate = useNavigate();
  const [userMedications, setUserMedications] = useState<Medicine[]>(
    MedicineService.getUserMedications(),
  );
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [medicationToRemove, setMedicationToRemove] = useState<string>("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [userConditions] = useState(["Asma", "Hipertensão", "Osteoartrite"]);

  const conditions = [
    { name: "Asma" },
    { name: "Hipertensão" },
    { name: "Osteoartrite" },
  ];

  const warnings = MedicineService.getContraindicationWarnings(userConditions);

  const handleMedicationClick = (medicine: Medicine) => {
    navigate(`/medication/${medicine.name.toLowerCase()}`);
  };

  const handleRemoveMedication = (medicationId: string) => {
    const medication = userMedications.find((med) => med.id === medicationId);
    if (medication) {
      setMedicationToRemove(medication.name);
      setShowRemoveDialog(true);
    }
  };

  const confirmRemoveMedication = () => {
    const medicationToRemoveObj = userMedications.find(
      (med) => med.name === medicationToRemove,
    );
    if (medicationToRemoveObj) {
      MedicineService.removeFromUserMedications(medicationToRemoveObj.id);
      setUserMedications(MedicineService.getUserMedications());
      setShowRemoveDialog(false);
      setMedicationToRemove("");
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  const handleAddMedication = () => {
    navigate("/search-menu");
  };

  if (userMedications.length === 0) {
    return (
      <div className="desktop-dashboard">
        <div className="dashboard-header">
          <h1 className="page-title">Meu Painel</h1>
          <button
            className="add-medication-header-btn"
            onClick={handleAddMedication}
          >
            + Adicionar Medicamento
          </button>
        </div>

        <div className="empty-dashboard-desktop">
          <div className="empty-content">
            <div className="empty-icon">📋</div>
            <h2>Bem-vindo ao seu painel pessoal!</h2>
            <p>
              Aqui você pode gerenciar seus medicamentos, acompanhar tratamentos
              e receber alertas importantes sobre interações medicamentosas.
            </p>
            <div className="empty-actions">
              <button className="primary-btn" onClick={handleAddMedication}>
                Adicionar Primeiro Medicamento
              </button>
              <button
                className="secondary-btn"
                onClick={() => navigate("/search?q=ibuprofeno")}
              >
                Explorar Medicamentos
              </button>
            </div>
          </div>

          <div className="getting-started">
            <h3>Como começar:</h3>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h4>Busque Medicamentos</h4>
                <p>
                  Use nossa busca para encontrar informações sobre medicamentos
                </p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <h4>Adicione à sua Lista</h4>
                <p>Adicione medicamentos que você usa regularmente</p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <h4>Receba Alertas</h4>
                <p>Seja notificado sobre possíveis interações e conflitos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="desktop-dashboard">
      <div className="dashboard-header">
        <h1 className="page-title">Meu Painel</h1>
        <button
          className="add-medication-header-btn"
          onClick={handleAddMedication}
        >
          + Adicionar Medicamento
        </button>
      </div>

      {showSuccessMessage && (
        <div className="success-message-desktop">
          <span className="success-icon">✅</span>
          Medicamento removido com sucesso!
        </div>
      )}

      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="dashboard-left">
          {/* Alerts Section */}
          {warnings.length > 0 && (
            <section className="alerts-section-desktop">
              <h2 className="section-title">⚠️ Alertas Importantes</h2>
              <div className="alerts-list">
                {warnings.map((warning, index) => (
                  <div key={index} className="alert-card-desktop">
                    <div className="alert-severity">
                      {warning.warnings.some((w) => w.severity === "high")
                        ? "🚨"
                        : "⚠️"}
                    </div>
                    <div className="alert-content">
                      <h4>Atenção com {warning.medicine.name}</h4>
                      <p>
                        Este medicamento{" "}
                        {warning.warnings.some((w) => w.severity === "high")
                          ? "é contraindicado"
                          : "pode não ser adequado"}{" "}
                        para pessoas com{" "}
                        {warning.warnings.map((w) => w.condition).join(", ")}.
                      </p>
                      <button
                        className="alert-action"
                        onClick={() => handleMedicationClick(warning.medicine)}
                      >
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Known Conditions */}
          <section className="conditions-section-desktop">
            <h2 className="section-title">🏥 Condições de Saúde</h2>
            <div className="conditions-card-desktop">
              <div className="conditions-list-desktop">
                {conditions.map((condition, index) => (
                  <div key={index} className="condition-item-desktop">
                    <span className="condition-badge">{condition.name}</span>
                  </div>
                ))}
              </div>
              <button className="manage-button-desktop">
                Gerenciar Condições
              </button>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="dashboard-right">
          <section className="medications-section-desktop">
            <div className="section-header">
              <h2 className="section-title">💊 Meus Medicamentos</h2>
              <span className="medication-count">
                {userMedications.length} medicamento
                {userMedications.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="medications-grid">
              {userMedications.map((medication) => (
                <div key={medication.id} className="medication-card-desktop">
                  <div className="medication-header">
                    <h3
                      className="medication-name clickable"
                      onClick={() => handleMedicationClick(medication)}
                    >
                      {medication.name}
                    </h3>
                    <div className="medication-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleMedicationClick(medication)}
                        title="Ver detalhes"
                      >
                        👁️
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveMedication(medication.id)}
                        title="Remover"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <div className="medication-details">
                    <div className="detail-row">
                      <span className="detail-label">Dose:</span>
                      <span className="detail-value">
                        {medication.schedule?.dose}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Frequência:</span>
                      <span className="detail-value">
                        A cada {medication.schedule?.frequency}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Duração:</span>
                      <span className="detail-value">
                        {medication.schedule?.duration}
                      </span>
                    </div>
                  </div>

                  {medication.schedule?.notes && (
                    <div className="medication-notes">
                      <span className="notes-label">Observações:</span>
                      <span className="notes-text">
                        {medication.schedule.notes}
                      </span>
                    </div>
                  )}

                  <div className="prescription-status-card">
                    <span
                      className={`status-badge ${medication.getPrescriptionStatusClass()}`}
                    >
                      {medication.getPrescriptionStatusText()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="add-medication-btn-desktop"
              onClick={handleAddMedication}
            >
              + Adicionar Novo Medicamento
            </button>
          </section>
        </div>
      </div>

      <RemoveMedicationDialog
        isOpen={showRemoveDialog}
        onClose={() => setShowRemoveDialog(false)}
        medicationName={medicationToRemove}
        onRemove={confirmRemoveMedication}
      />
    </div>
  );
}

export default DesktopEnhancedDashboard;
