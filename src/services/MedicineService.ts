import { Medicine } from "../models/Medicine";

export class MedicineService {
  private static medicines: Map<string, Medicine> = new Map();
  private static userMedicines: Map<string, Medicine> = new Map();

  static {
    // Initialize with some sample medicines
    this.addMedicine(Medicine.createIbuprofeno());
    this.addMedicine(Medicine.createParacetamol());

    // Add more medicines
    this.addMedicine(
      new Medicine({
        id: "cetoprofeno_001",
        name: "Cetoprofeno",
        composition: "Cetoprofeno, excipientes qsp.",
        requiresPrescription: true,
        usageCategories: [
          {
            icon: "⚖️",
            title: "Inflamação nas juntas",
            backgroundColor: "#1976d2",
          },
        ],
        contraindications: [
          {
            condition: "Asma",
            severity: "high",
            description: "Contraindicado para asmáticos",
          },
        ],
      }),
    );

    this.addMedicine(
      new Medicine({
        id: "nimesulida_001",
        name: "Nimesulida",
        composition: "Nimesulida, excipientes qsp.",
        requiresPrescription: true,
        usageCategories: [
          {
            icon: "🔥",
            title: "Anti-inflamatório",
            backgroundColor: "#1976d2",
          },
        ],
        contraindications: [
          {
            condition: "Doença hepática",
            severity: "high",
          },
        ],
      }),
    );

    this.addMedicine(
      new Medicine({
        id: "budesonida_001",
        name: "Budesonida",
        composition: "Budesonida, excipientes qsp.",
        requiresPrescription: true,
        commonDoses: ["200mcg", "400mcg"],
        usageCategories: [
          {
            icon: "🫁",
            title: "Asma",
            backgroundColor: "#1976d2",
          },
        ],
      }),
    );

    this.addMedicine(
      new Medicine({
        id: "furosemida_001",
        name: "Furosemida",
        composition: "Furosemida, excipientes qsp.",
        requiresPrescription: true,
        commonDoses: ["20mg", "40mg", "80mg"],
        usageCategories: [
          {
            icon: "💧",
            title: "Diurético",
            backgroundColor: "#1976d2",
          },
        ],
      }),
    );
  }

  private static addMedicine(medicine: Medicine): void {
    this.medicines.set(medicine.id, medicine);
  }

  // Search medicines
  static searchByName(name: string): Medicine[] {
    const searchTerm = name.toLowerCase().trim();
    if (!searchTerm) return [];

    return Array.from(this.medicines.values()).filter(
      (medicine) =>
        medicine.name.toLowerCase().includes(searchTerm) ||
        (medicine.genericName &&
          medicine.genericName.toLowerCase().includes(searchTerm)),
    );
  }

  static getExactMatches(name: string): Medicine[] {
    const searchTerm = name.toLowerCase().trim();
    return Array.from(this.medicines.values()).filter(
      (medicine) => medicine.name.toLowerCase() === searchTerm,
    );
  }

  static getSimilarMedicines(
    name: string,
    excludeExact: boolean = true,
  ): Medicine[] {
    const searchTerm = name.toLowerCase().trim();
    return Array.from(this.medicines.values()).filter((medicine) => {
      const isExactMatch = medicine.name.toLowerCase() === searchTerm;
      const isPartialMatch = medicine.name.toLowerCase().includes(searchTerm);

      if (excludeExact) {
        return isPartialMatch && !isExactMatch;
      }
      return isPartialMatch;
    });
  }

  static searchBySymptom(symptom: string): Medicine[] {
    const searchTerm = symptom.toLowerCase().trim();
    return Array.from(this.medicines.values()).filter((medicine) =>
      medicine.usageCategories.some(
        (category) =>
          category.title.toLowerCase().includes(searchTerm) ||
          (category.description &&
            category.description.toLowerCase().includes(searchTerm)),
      ),
    );
  }

  // Get medicine by ID or name
  static getMedicineById(id: string): Medicine | undefined {
    return this.medicines.get(id);
  }

  static getMedicineByName(name: string): Medicine | undefined {
    return Array.from(this.medicines.values()).find(
      (medicine) => medicine.name.toLowerCase() === name.toLowerCase(),
    );
  }

  // User medication management
  static addToUserMedications(medicineId: string, schedule: any): boolean {
    const medicine = this.getMedicineById(medicineId);
    if (!medicine) return false;

    const userMedicine = medicine.addToUserMedications(schedule);
    this.userMedicines.set(userMedicine.id, userMedicine);
    return true;
  }

  static getUserMedications(): Medicine[] {
    return Array.from(this.userMedicines.values()).filter(
      (med) => med.isActive,
    );
  }

  static removeFromUserMedications(medicineId: string): boolean {
    const userMedicine = this.userMedicines.get(medicineId);
    if (!userMedicine) return false;

    const deactivatedMedicine = userMedicine.deactivate();
    this.userMedicines.set(medicineId, deactivatedMedicine);
    return true;
  }

  static updateUserMedicationSchedule(
    medicineId: string,
    newSchedule: any,
  ): boolean {
    const userMedicine = this.userMedicines.get(medicineId);
    if (!userMedicine) return false;

    const updatedMedicine = userMedicine.updateSchedule(newSchedule);
    this.userMedicines.set(medicineId, updatedMedicine);
    return true;
  }

  // Health condition warnings
  static getContraindicationWarnings(userConditions: string[]): {
    medicine: Medicine;
    warnings: any[];
  }[] {
    const userMedicines = this.getUserMedications();

    return userMedicines
      .map((medicine) => ({
        medicine,
        warnings: medicine.getContraindicationWarnings(userConditions),
      }))
      .filter((item) => item.warnings.length > 0);
  }

  // Get all available medicines
  static getAllMedicines(): Medicine[] {
    return Array.from(this.medicines.values());
  }

  // Initialize with user medications (for demo purposes)
  static initializeUserMedications(): void {
    // Add some demo user medications
    const ibuprofeno = this.getMedicineByName("Ibuprofeno");
    const budesonida = this.getMedicineByName("Budesonida");
    const furosemida = this.getMedicineByName("Furosemida");

    if (ibuprofeno) {
      this.addToUserMedications(ibuprofeno.id, {
        dose: "600mg",
        frequency: "24 horas",
        duration: "7 dias",
      });
    }

    if (budesonida) {
      this.addToUserMedications(budesonida.id, {
        dose: "200mcg",
        frequency: "12 horas",
        duration: "Uso contínuo",
      });
    }

    if (furosemida) {
      this.addToUserMedications(furosemida.id, {
        dose: "40mg",
        frequency: "8 horas",
        duration: "30 dias",
      });
    }
  }
}

// Initialize user medications for demo
MedicineService.initializeUserMedications();
