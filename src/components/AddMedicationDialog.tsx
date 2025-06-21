import { useState } from "react";
import { Medicine } from "../models/Medicine";

interface AddMedicationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  medicationName: string;
  medicine?: Medicine;
  onAdd: (medication: any) => void;
}

function AddMedicationDialog({
  isOpen,
  onClose,
  medicationName,
  medicine,
  onAdd,
}: AddMedicationDialogProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    dose: "",
    frequency: "",
    duration: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    onAdd({
      name: medicationName,
      ...formData,
    });
    onClose();
    setStep(1);
    setFormData({
      dose: "",
      frequency: "",
      duration: "",
      notes: "",
    });
  };

  const renderStep1 = () => (
    <div className="dialog-step">
      <h3>Dosagem do Medicamento</h3>
      <p>Qual a dosagem prescrita para {medicationName}?</p>

      <div className="dose-options">
        {(medicine?.commonDoses || ["200mg", "400mg", "600mg", "800mg"]).map(
          (dose) => (
            <button
              key={dose}
              className={`dose-option ${formData.dose === dose ? "selected" : ""}`}
              onClick={() => setFormData({ ...formData, dose })}
            >
              {dose}
            </button>
          ),
        )}
      </div>

      <div className="custom-dose">
        <label>Ou digite uma dosagem personalizada:</label>
        <input
          type="text"
          placeholder="Ex: 500mg"
          value={
            formData.dose.includes("mg") &&
            !["200mg", "400mg", "600mg", "800mg"].includes(formData.dose)
              ? formData.dose
              : ""
          }
          onChange={(e) => setFormData({ ...formData, dose: e.target.value })}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="dialog-step">
      <h3>Frequência de Uso</h3>
      <p>Com que frequência você deve tomar este medicamento?</p>

      <div className="frequency-options">
        {(
          medicine?.commonFrequencies || [
            "6 horas",
            "8 horas",
            "12 horas",
            "24 horas",
          ]
        ).map((freq) => {
          const label =
            freq === "6 horas"
              ? "A cada 6 horas"
              : freq === "8 horas"
                ? "A cada 8 horas"
                : freq === "12 horas"
                  ? "A cada 12 horas"
                  : freq === "24 horas"
                    ? "Uma vez ao dia"
                    : freq;
          return (
            <button
              key={freq}
              className={`frequency-option ${formData.frequency === freq ? "selected" : ""}`}
              onClick={() => setFormData({ ...formData, frequency: freq })}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="custom-frequency">
        <label>Ou especifique:</label>
        <input
          type="text"
          placeholder="Ex: 2x ao dia"
          value={
            !["6 horas", "8 horas", "12 horas", "24 horas"].includes(
              formData.frequency,
            )
              ? formData.frequency
              : ""
          }
          onChange={(e) =>
            setFormData({ ...formData, frequency: e.target.value })
          }
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="dialog-step">
      <h3>Duração do Tratamento</h3>
      <p>Por quanto tempo você deve tomar este medicamento?</p>

      <div className="duration-options">
        {["Uso contínuo", "7 dias", "14 dias", "30 dias"].map((duration) => (
          <button
            key={duration}
            className={`duration-option ${formData.duration === duration ? "selected" : ""}`}
            onClick={() => setFormData({ ...formData, duration })}
          >
            {duration}
          </button>
        ))}
      </div>

      <div className="notes-section">
        <label>Observações (opcional):</label>
        <textarea
          placeholder="Ex: Tomar após as refeições"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  );

  return (
    <div className="dialog-overlay">
      <div className="add-medication-dialog">
        <div className="dialog-header">
          <h2>Adicionar {medicationName}</h2>
          <button className="dialog-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="dialog-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          <span className="progress-text">Passo {step} de 3</span>
        </div>

        <div className="dialog-content">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        <div className="dialog-actions">
          {step > 1 && (
            <button
              className="dialog-button secondary"
              onClick={handlePrevious}
            >
              Voltar
            </button>
          )}
          {step < 3 ? (
            <button
              className="dialog-button primary"
              onClick={handleNext}
              disabled={
                (step === 1 && !formData.dose) ||
                (step === 2 && !formData.frequency)
              }
            >
              Próximo
            </button>
          ) : (
            <button
              className="dialog-button primary"
              onClick={handleSubmit}
              disabled={!formData.duration}
            >
              Adicionar Medicamento
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddMedicationDialog;
