import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddMedicationDialog from "../components/AddMedicationDialog";

interface UsageCategory {
  icon: string;
  title: string;
  description: string;
  backgroundColor: string;
}

function EnhancedMedicationDetails() {
  const { medicationName } = useParams();
  const navigate = useNavigate();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleAddToMyMedications = () => {
    setShowAddDialog(true);
  };

  const handleMedicationAdded = (medicationData: any) => {
    // In a real app, this would add to user's medication list
    console.log("Adding medication:", medicationData);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate("/dashboard");
    }, 2000);
  };

  // Mock medication data
  const medicationData = {
    name: "Ibuprofeno",
    officialConsult: "Consultar bula oficial",
    composition:
      "Dióxido de silício, lactose monoidratada, celulose microcristalina, croscarmelose sódica, povidona, estearato de magnésio, copolímero do álcool polivinílico e macrogol, macrogol e dióxido de titânio.",
    requiresPrescription: false,
  };

  const usageCategories: UsageCategory[] = [
    {
      icon: "⚖️",
      title: "Inflamação nas juntas",
      description: "",
      backgroundColor: "#1976d2",
    },
    {
      icon: "🔧",
      title: "Inflamação nas juntas",
      description: "",
      backgroundColor: "#1976d2",
    },
    {
      icon: "🩺",
      title: "Dores gerais no corpo",
      description: "",
      backgroundColor: "#1976d2",
    },
    {
      icon: "📋",
      title: "Lorem ipsum",
      description: "",
      backgroundColor: "#b3e5fc",
    },
    {
      icon: "📋",
      title: "Lorem ipsum",
      description: "",
      backgroundColor: "#b3e5fc",
    },
  ];

  const sideEffects: UsageCategory[] = [
    {
      icon: "🖐️",
      title: "Manchas vermelhas na pele",
      description: "",
      backgroundColor: "#1976d2",
    },
    {
      icon: "🤢",
      title: "Dor no estômago",
      description: "",
      backgroundColor: "#1976d2",
    },
    {
      icon: "😷",
      title: "Enjoo",
      description: "",
      backgroundColor: "#1976d2",
    },
    {
      icon: "📋",
      title: "Lorem ipsum",
      description: "",
      backgroundColor: "#b3e5fc",
    },
    {
      icon: "📋",
      title: "Lorem ipsum",
      description: "",
      backgroundColor: "#b3e5fc",
    },
    {
      icon: "📋",
      title: "Lorem ipsum",
      description: "",
      backgroundColor: "#b3e5fc",
    },
  ];

  const contraindications: UsageCategory[] = [
    {
      icon: "🫁",
      title: "Pessoas com Asma",
      description: "",
      backgroundColor: "#1976d2",
    },
    {
      icon: "👃",
      title: "Pessoas com Rinite",
      description: "",
      backgroundColor: "#1976d2",
    },
    {
      icon: "❤️",
      title: "Pessoas operadas do coração",
      description: "(cirurgia cardiovascular em geral)",
      backgroundColor: "#1976d2",
    },
  ];

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

      {showWarning && (
        <div className="consultation-warning">
          <div className="warning-content">
            <div className="warning-icon">⚠️</div>
            <div className="warning-text">
              <h4>Atenção!</h4>
              <p>
                Este medicamento pode não ser adequado para pessoas com Asma.
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
          Este medicamento não exige prescrição médica
        </span>
      </div>

      <div className="medication-details">
        <h1 className="medication-title">
          {medicationData.name}
          <a href="#" className="official-link">
            {medicationData.officialConsult}
          </a>
        </h1>

        <p className="medication-composition">
          <strong>Composição:</strong> {medicationData.composition}
        </p>

        <section className="usage-section">
          <h2 className="section-heading">
            Para o que usar?{" "}
            <span className="section-note">Principais usos</span>
          </h2>
          <div className="category-grid">
            {usageCategories.map((category, index) => (
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

        <section className="usage-section">
          <h2 className="section-heading">
            O que você pode sentir?{" "}
            <span className="section-note">Possíveis efeitos</span>
          </h2>
          <div className="category-grid">
            {sideEffects.map((effect, index) => (
              <div
                key={index}
                className="category-card"
                style={{ backgroundColor: effect.backgroundColor }}
              >
                <div className="category-icon">{effect.icon}</div>
                <div className="category-text">
                  <div className="category-title">{effect.title}</div>
                  {effect.description && (
                    <div className="category-description">
                      {effect.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="usage-section">
          <h2 className="section-heading">
            Quem não pode usar?{" "}
            <span className="section-note">Contraindicações</span>
          </h2>
          <div className="category-grid contraindications-grid">
            {contraindications.map((contraindication, index) => (
              <div
                key={index}
                className="category-card"
                style={{ backgroundColor: contraindication.backgroundColor }}
              >
                <div className="category-icon">{contraindication.icon}</div>
                <div className="category-text">
                  <div className="category-title">{contraindication.title}</div>
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
      </div>

      <AddMedicationDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        medicationName={medicationData.name}
        onAdd={handleMedicationAdded}
      />
    </>
  );
}

export default EnhancedMedicationDetails;
