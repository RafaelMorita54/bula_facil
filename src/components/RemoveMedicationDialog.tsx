import { useState } from "react";

interface RemoveMedicationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  medicationName: string;
  onRemove: () => void;
}

function RemoveMedicationDialog({
  isOpen,
  onClose,
  medicationName,
  onRemove,
}: RemoveMedicationDialogProps) {
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onRemove();
      onClose();
      setStep(1);
      setReason("");
    }
  };

  const handleCancel = () => {
    onClose();
    setStep(1);
    setReason("");
  };

  const renderStep1 = () => (
    <div className="dialog-step">
      <div className="warning-icon">⚠️</div>
      <h3>Remover Medicamento</h3>
      <p>
        Tem certeza que deseja remover <strong>{medicationName}</strong> da sua
        lista de medicamentos?
      </p>

      <div className="warning-note">
        <p>
          Esta ação não pode ser desfeita. Você precisará adicionar o
          medicamento novamente se mudar de ideia.
        </p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="dialog-step">
      <h3>Motivo da Remoção</h3>
      <p>Por que você está removendo este medicamento?</p>

      <div className="reason-options">
        {[
          "Terminei o tratamento",
          "Médico alterou a prescrição",
          "Efeitos colaterais",
          "Não estava funcionando",
          "Adicionei por engano",
          "Outro motivo",
        ].map((reasonOption) => (
          <button
            key={reasonOption}
            className={`reason-option ${reason === reasonOption ? "selected" : ""}`}
            onClick={() => setReason(reasonOption)}
          >
            {reasonOption}
          </button>
        ))}
      </div>

      {reason === "Outro motivo" && (
        <div className="custom-reason">
          <textarea placeholder="Descreva o motivo..." rows={3} />
        </div>
      )}
    </div>
  );

  return (
    <div className="dialog-overlay">
      <div className="remove-medication-dialog">
        <div className="dialog-header">
          <h2>Remover Medicamento</h2>
          <button className="dialog-close" onClick={handleCancel}>
            ×
          </button>
        </div>

        <div className="dialog-content">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
        </div>

        <div className="dialog-actions">
          <button className="dialog-button secondary" onClick={handleCancel}>
            Cancelar
          </button>
          <button
            className="dialog-button danger"
            onClick={handleConfirm}
            disabled={step === 2 && !reason}
          >
            {step === 1 ? "Continuar" : "Remover Medicamento"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoveMedicationDialog;
