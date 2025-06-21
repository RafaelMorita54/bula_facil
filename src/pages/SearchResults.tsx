import { useSearchParams, useNavigate } from "react-router-dom";
import { MedicineService } from "../services/MedicineService";
import { Medicine } from "../models/Medicine";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchTerm = searchParams.get("q") || "ibuprofeno";
  const searchType = searchParams.get("type") || "medicine";

  const getExactMatches = (): Medicine[] => {
    if (searchType === "symptom") return [];
    return MedicineService.getExactMatches(searchTerm);
  };

  const getSimilarMedications = (): Medicine[] => {
    if (searchType === "symptom") return [];
    return MedicineService.getSimilarMedicines(searchTerm).slice(0, 3);
  };

  const getSymptomMedications = (): Medicine[] => {
    if (searchType === "medicine") return [];
    return MedicineService.searchBySymptom(searchTerm).slice(0, 5);
  };

  const handleMedicationClick = (medicine: Medicine) => {
    navigate(`/medication/${medicine.name.toLowerCase()}`);
  };

  const renderMedicationItem = (medicine: Medicine, index: number) => (
    <div
      key={medicine.id}
      className="medication-item clickable"
      onClick={() => handleMedicationClick(medicine)}
    >
      <div className="medication-info">
        <span className="medication-icon">💊</span>
        <span className="medication-name">{medicine.getDisplayName()}</span>
      </div>
      <span
        className={`prescription-status ${medicine.getPrescriptionStatusClass()}`}
      >
        {medicine.getPrescriptionStatusText()}
      </span>
    </div>
  );

  return (
    <>
      {/* Exact matches section */}
      {searchType === "medicine" && (
        <section className="medication-section">
          <h2 className="section-title">
            Medicamentos com nome "{searchTerm}"
          </h2>
          <div className="medication-list">
            {getExactMatches().length > 0 ? (
              getExactMatches().map((medicine, index) =>
                renderMedicationItem(medicine, index),
              )
            ) : (
              <div className="no-results">
                <span>Nenhum Medicamento Encontrado</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Similar medications section */}
      {searchType === "medicine" && getSimilarMedications().length > 0 && (
        <section className="medication-section">
          <h2 className="section-title">
            Medicamentos similares{" "}
            <span className="section-subtitle">(anti-inflamatórios)</span>
          </h2>
          <div className="medication-list">
            {getSimilarMedications().map((medicine, index) =>
              renderMedicationItem(medicine, index),
            )}
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

      {/* Symptom-based medications section */}
      <section className="medication-section">
        <h2 className="section-title">
          {searchType === "symptom"
            ? `Medicamentos para "${searchTerm}"`
            : `Medicamentos para sintoma "${searchTerm}"`}
        </h2>
        <div className="medication-list">
          {searchType === "symptom" && getSymptomMedications().length > 0 ? (
            getSymptomMedications().map((medicine, index) =>
              renderMedicationItem(medicine, index),
            )
          ) : (
            <div className="no-results">
              <span>Nenhum Medicamento Encontrado</span>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default SearchResults;
