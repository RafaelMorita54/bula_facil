import { useSearchParams, useNavigate } from "react-router-dom";

interface Medication {
  name: string;
  requiresPrescription: boolean;
}

function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchTerm = searchParams.get("q") || "ibuprofeno";

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

  const handleMedicationClick = (medicationName: string) => {
    navigate(`/medication/${medicationName.toLowerCase()}`);
  };

  return (
    <>
      {/* Exact matches section */}
      <section className="medication-section">
        <h2 className="section-title">Medicamentos com nome "{searchTerm}"</h2>
        <div className="medication-list">
          {getExactMatches().length > 0 ? (
            getExactMatches().map((medication, index) => (
              <div
                key={index}
                className="medication-item clickable"
                onClick={() => handleMedicationClick(medication.name)}
              >
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
              <div
                key={index}
                className="medication-item clickable"
                onClick={() => handleMedicationClick(medication.name)}
              >
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
    </>
  );
}

export default SearchResults;
