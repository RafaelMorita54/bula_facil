import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddMedicationDialog from "../components/AddMedicationDialog";
import { MedicineService } from "../services/MedicineService";
import { Medicine } from "../models/Medicine";

function EnhancedMedicationDetails() {
  const { medicationName } = useParams();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [userConditions] = useState(["Asma", "Hipertensão", "Osteoartrite"]); // In real app, get from user profile

  useEffect(() => {
    if (medicationName) {
      const foundMedicine = MedicineService.getMedicineByName(medicationName);
      setMedicine(foundMedicine || null);
    }
  }, [medicationName]);

  const handleAddToMyMedications = () => {
    setShowAddDialog(true);
  };

  const handleMedicationAdded = (medicationData: any) => {
    if (medicine) {
      MedicineService.addToUserMedications(medicine.id, medicationData);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate("/dashboard");
      }, 2000);
    }
  };

  if (!medicine) {
    return (
      <div className="medication-not-found">
        <h2>Medicamento não encontrado</h2>
        <p>
          O medicamento "{medicationName}" não foi encontrado em nossa base de
          dados.
        </p>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }

  const warnings = medicine.getContraindicationWarnings(userConditions);
  const hasHighSeverityWarnings =
    medicine.hasHighSeverityContraindications(userConditions);

  const getSideEffectIcon = (name: string): string => {
    if (name.includes("pele") || name.includes("mancha")) return "🖐️";
    if (name.includes("estômago") || name.includes("gástrica")) return "🤢";
    if (name.includes("enjoo") || name.includes("náusea")) return "😷";
    if (name.includes("tontura")) return "😵‍💫";
    if (name.includes("hepática") || name.includes("fígado")) return "🫄";
    return "⚠️";
  };

  const getContraindicationIcon = (condition: string): string => {
    if (condition.toLowerCase().includes("asma")) return "🫁";
    if (condition.toLowerCase().includes("rinite")) return "👃";
    if (
      condition.toLowerCase().includes("cardiovascular") ||
      condition.toLowerCase().includes("coração")
    )
      return "❤️";
    if (
      condition.toLowerCase().includes("hepática") ||
      condition.toLowerCase().includes("fígado")
    )
      return "🫄";
    if (condition.toLowerCase().includes("úlcera")) return "🤢";
    return "⚠️";
  };

  return (
    <>
      {showSuccessMessage && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-icon">✅</div>
            <h3>Medicamento Adicionado!</h3>
            <p>{medicationData.name} foi adicionado aos seus medicamentos.</p>
          </div>
        </div>
      )}

      {showWarning && warnings.length > 0 && (
        <div className="consultation-warning">
          <div className="warning-content">
            <div className="warning-icon">⚠️</div>
            <div className="warning-text">
              <h4>
                {hasHighSeverityWarnings
                  ? "Contraindicação Grave!"
                  : "Atenção!"}
              </h4>
              <p>
                Este medicamento{" "}
                {hasHighSeverityWarnings
                  ? "é contraindicado"
                  : "pode não ser adequado"}{" "}
                para pessoas com {warnings.map((w) => w.condition).join(", ")}.
                Consulte um médico antes de usar.
              </p>
            </div>
            <button
              className="warning-close"
              onClick={() => setShowWarning(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="medication-header">
        <button
          className="add-medication-btn"
          onClick={handleAddToMyMedications}
        >
          Adicionar aos Meus Remédios
        </button>
        <span className="prescription-notice">
          {medicine.getPrescriptionStatusText()}
        </span>
      </div>

      <div className="medication-details">
        <h1 className="medication-title">
          {medicine.getDisplayName()}
          {medicine.officialBulletinUrl && (
            <a href={medicine.officialBulletinUrl} className="official-link">
              Consultar bula oficial
            </a>
          )}
        </h1>

        <p className="medication-composition">
          <strong>Composição:</strong> {medicine.composition}
        </p>

        {medicine.usageCategories.length > 0 && (
          <section className="usage-section">
            <h2 className="section-heading">
              Para o que usar?{" "}
              <span className="section-note">Principais usos</span>
            </h2>
            <div className="category-grid">
              {medicine.usageCategories.map((category, index) => (
                <div
                  key={index}
                  className="category-card"
                  style={{ backgroundColor: category.backgroundColor }}
                >
                  <div className="category-icon">{category.icon}</div>
                  <div className="category-text">
                    <div className="category-title">{category.title}</div>
                    {category.description && (
                      <div className="category-description">
                        {category.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {medicine.sideEffects.length > 0 && (
          <section className="usage-section">
            <h2 className="section-heading">
              O que você pode sentir?{" "}
              <span className="section-note">Possíveis efeitos</span>
            </h2>
            <div className="category-grid">
              {medicine.sideEffects.map((effect, index) => (
                <div
                  key={index}
                  className="category-card"
                  style={{
                    backgroundColor:
                      effect.severity === "severe"
                        ? "#d32f2f"
                        : effect.severity === "moderate"
                          ? "#ff9800"
                          : "#1976d2",
                  }}
                >
                  <div className="category-icon">
                    {getSideEffectIcon(effect.name)}
                  </div>
                  <div className="category-text">
                    <div className="category-title">{effect.name}</div>
                    {effect.description && (
                      <div className="category-description">
                        {effect.description}
                      </div>
                    )}
                    <div className="category-description">
                      {effect.frequency === "common"
                        ? "Comum"
                        : effect.frequency === "uncommon"
                          ? "Incomum"
                          : "Raro"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {medicine.contraindications.length > 0 && (
          <section className="usage-section">
            <h2 className="section-heading">
              Quem não pode usar?{" "}
              <span className="section-note">Contraindicações</span>
            </h2>
            <div className="category-grid contraindications-grid">
              {medicine.contraindications.map((contraindication, index) => (
                <div
                  key={index}
                  className="category-card"
                  style={{
                    backgroundColor:
                      contraindication.severity === "high"
                        ? "#d32f2f"
                        : contraindication.severity === "medium"
                          ? "#ff9800"
                          : "#1976d2",
                  }}
                >
                  <div className="category-icon">
                    {getContraindicationIcon(contraindication.condition)}
                  </div>
                  <div className="category-text">
                    <div className="category-title">
                      Pessoas com {contraindication.condition}
                    </div>
                    {contraindication.description && (
                      <div className="category-description">
                        {contraindication.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <AddMedicationDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        medicationName={medicine.name}
        medicine={medicine}
        onAdd={handleMedicationAdded}
      />
    </>
  );
}

export default EnhancedMedicationDetails;
