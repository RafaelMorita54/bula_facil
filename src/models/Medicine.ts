export interface UsageCategory {
  icon: string;
  title: string;
  description?: string;
  backgroundColor: string;
}

export interface MedicationSchedule {
  dose: string;
  frequency: string;
  duration: string;
  notes?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface Contraindication {
  condition: string;
  severity: "high" | "medium" | "low";
  description?: string;
}

export interface SideEffect {
  name: string;
  frequency: "common" | "uncommon" | "rare";
  severity: "mild" | "moderate" | "severe";
  description?: string;
}

export class Medicine {
  public readonly id: string;
  public readonly name: string;
  public readonly genericName?: string;
  public readonly composition: string;
  public readonly requiresPrescription: boolean;
  public readonly officialBulletinUrl?: string;
  public readonly usageCategories: UsageCategory[];
  public readonly sideEffects: SideEffect[];
  public readonly contraindications: Contraindication[];
  public readonly commonDoses: string[];
  public readonly commonFrequencies: string[];

  // User-specific data for personal medication list
  public schedule?: MedicationSchedule;
  public isActive: boolean = false;
  public addedDate?: Date;

  constructor(data: {
    id?: string;
    name: string;
    genericName?: string;
    composition: string;
    requiresPrescription: boolean;
    officialBulletinUrl?: string;
    usageCategories?: UsageCategory[];
    sideEffects?: SideEffect[];
    contraindications?: Contraindication[];
    commonDoses?: string[];
    commonFrequencies?: string[];
    schedule?: MedicationSchedule;
  }) {
    this.id = data.id || this.generateId();
    this.name = data.name;
    this.genericName = data.genericName;
    this.composition = data.composition;
    this.requiresPrescription = data.requiresPrescription;
    this.officialBulletinUrl = data.officialBulletinUrl;
    this.usageCategories = data.usageCategories || [];
    this.sideEffects = data.sideEffects || [];
    this.contraindications = data.contraindications || [];
    this.commonDoses = data.commonDoses || ["200mg", "400mg", "600mg", "800mg"];
    this.commonFrequencies = data.commonFrequencies || [
      "6 horas",
      "8 horas",
      "12 horas",
      "24 horas",
    ];
    this.schedule = data.schedule;
  }

  private generateId(): string {
    return `med_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Utility methods
  public getPrescriptionStatusText(): string {
    return this.requiresPrescription
      ? "Exige prescrição médica"
      : "Não exige prescrição médica";
  }

  public getPrescriptionStatusClass(): string {
    return this.requiresPrescription
      ? "requires-prescription"
      : "no-prescription";
  }

  public getDisplayName(): string {
    return this.genericName ? `${this.name} (${this.genericName})` : this.name;
  }

  public isContraindicatedFor(conditions: string[]): boolean {
    return this.contraindications.some((contraindication) =>
      conditions.some(
        (condition) =>
          contraindication.condition.toLowerCase() === condition.toLowerCase(),
      ),
    );
  }

  public getContraindicationWarnings(
    userConditions: string[],
  ): Contraindication[] {
    return this.contraindications.filter((contraindication) =>
      userConditions.some(
        (condition) =>
          contraindication.condition.toLowerCase() === condition.toLowerCase(),
      ),
    );
  }

  public hasHighSeverityContraindications(userConditions: string[]): boolean {
    return this.getContraindicationWarnings(userConditions).some(
      (warning) => warning.severity === "high",
    );
  }

  public addToUserMedications(schedule: MedicationSchedule): Medicine {
    const medicineInstance = new Medicine({
      id: this.id,
      name: this.name,
      genericName: this.genericName,
      composition: this.composition,
      requiresPrescription: this.requiresPrescription,
      officialBulletinUrl: this.officialBulletinUrl,
      usageCategories: this.usageCategories,
      sideEffects: this.sideEffects,
      contraindications: this.contraindications,
      commonDoses: this.commonDoses,
      commonFrequencies: this.commonFrequencies,
      schedule,
    });

    medicineInstance.isActive = true;
    medicineInstance.addedDate = new Date();

    return medicineInstance;
  }

  public updateSchedule(newSchedule: Partial<MedicationSchedule>): Medicine {
    if (!this.schedule) {
      throw new Error(
        "Cannot update schedule for medicine without existing schedule",
      );
    }

    const updatedSchedule = { ...this.schedule, ...newSchedule };
    const updatedMedicine = new Medicine({
      id: this.id,
      name: this.name,
      genericName: this.genericName,
      composition: this.composition,
      requiresPrescription: this.requiresPrescription,
      officialBulletinUrl: this.officialBulletinUrl,
      usageCategories: this.usageCategories,
      sideEffects: this.sideEffects,
      contraindications: this.contraindications,
      commonDoses: this.commonDoses,
      commonFrequencies: this.commonFrequencies,
      schedule: updatedSchedule,
    });

    updatedMedicine.isActive = this.isActive;
    updatedMedicine.addedDate = this.addedDate;

    return updatedMedicine;
  }

  public deactivate(): Medicine {
    const deactivatedMedicine = new Medicine({
      id: this.id,
      name: this.name,
      genericName: this.genericName,
      composition: this.composition,
      requiresPrescription: this.requiresPrescription,
      officialBulletinUrl: this.officialBulletinUrl,
      usageCategories: this.usageCategories,
      sideEffects: this.sideEffects,
      contraindications: this.contraindications,
      commonDoses: this.commonDoses,
      commonFrequencies: this.commonFrequencies,
      schedule: this.schedule,
    });

    deactivatedMedicine.isActive = false;
    deactivatedMedicine.addedDate = this.addedDate;

    return deactivatedMedicine;
  }

  // Static factory methods
  static createIbuprofeno(): Medicine {
    return new Medicine({
      id: "ibuprofeno_001",
      name: "Ibuprofeno",
      genericName: "Ácido 2-(4-isobutilfenil)propanoico",
      composition:
        "Dióxido de silício, lactose monoidratada, celulose microcristalina, croscarmelose sódica, povidona, estearato de magnésio, copolímero do álcool polivinílico e macrogol, macrogol e dióxido de titânio.",
      requiresPrescription: false,
      officialBulletinUrl: "#",
      usageCategories: [
        {
          icon: "⚖️",
          title: "Inflamação nas juntas",
          description: "Reduz inflamação articular",
          backgroundColor: "#1976d2",
        },
        {
          icon: "🔧",
          title: "Dores musculares",
          description: "Alívio de dores musculares",
          backgroundColor: "#1976d2",
        },
        {
          icon: "🩺",
          title: "Dores gerais no corpo",
          description: "Analgésico para dores diversas",
          backgroundColor: "#1976d2",
        },
        {
          icon: "🤒",
          title: "Febre",
          description: "Redução da temperatura corporal",
          backgroundColor: "#b3e5fc",
        },
        {
          icon: "🦷",
          title: "Dor de dente",
          description: "Alívio de dores dentárias",
          backgroundColor: "#b3e5fc",
        },
      ],
      sideEffects: [
        {
          name: "Manchas vermelhas na pele",
          frequency: "uncommon",
          severity: "mild",
          description: "Reações alérgicas cutâneas",
        },
        {
          name: "Dor no estômago",
          frequency: "common",
          severity: "moderate",
          description: "Irritação gastrointestinal",
        },
        {
          name: "Enjoo",
          frequency: "common",
          severity: "mild",
          description: "Náuseas e mal-estar",
        },
        {
          name: "Tontura",
          frequency: "uncommon",
          severity: "mild",
          description: "Vertigem e desequilíbrio",
        },
        {
          name: "Úlcera gástrica",
          frequency: "rare",
          severity: "severe",
          description: "Lesão na mucosa do estômago",
        },
      ],
      contraindications: [
        {
          condition: "Asma",
          severity: "high",
          description: "Pode causar broncoespasmo severo",
        },
        {
          condition: "Rinite",
          severity: "medium",
          description: "Pode agravar sintomas respiratórios",
        },
        {
          condition: "Cirurgia Cardiovascular",
          severity: "high",
          description: "Risco de complicações pós-operatórias",
        },
        {
          condition: "Úlcera péptica",
          severity: "high",
          description: "Pode causar sangramento gastrointestinal",
        },
      ],
      commonDoses: ["200mg", "400mg", "600mg", "800mg"],
      commonFrequencies: ["6 horas", "8 horas", "12 horas", "24 horas"],
    });
  }

  static createParacetamol(): Medicine {
    return new Medicine({
      id: "paracetamol_001",
      name: "Paracetamol",
      genericName: "N-acetil-para-aminofenol",
      composition: "Paracetamol, amido, povidona, ácido esteárico.",
      requiresPrescription: false,
      usageCategories: [
        {
          icon: "🤒",
          title: "Febre",
          description: "Redução da temperatura corporal",
          backgroundColor: "#1976d2",
        },
        {
          icon: "🧠",
          title: "Dor de cabeça",
          description: "Alívio de cefaleias",
          backgroundColor: "#1976d2",
        },
        {
          icon: "🦷",
          title: "Dor de dente",
          description: "Analgésico dental",
          backgroundColor: "#b3e5fc",
        },
      ],
      sideEffects: [
        {
          name: "Lesão hepática",
          frequency: "rare",
          severity: "severe",
          description: "Hepatotoxicidade em doses elevadas",
        },
      ],
      contraindications: [
        {
          condition: "Doença hepática",
          severity: "high",
          description: "Metabolização prejudicada",
        },
      ],
      commonDoses: ["500mg", "750mg", "1g"],
      commonFrequencies: ["6 horas", "8 horas"],
    });
  }

  // Convert to simple object for API/storage
  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      genericName: this.genericName,
      composition: this.composition,
      requiresPrescription: this.requiresPrescription,
      officialBulletinUrl: this.officialBulletinUrl,
      usageCategories: this.usageCategories,
      sideEffects: this.sideEffects,
      contraindications: this.contraindications,
      commonDoses: this.commonDoses,
      commonFrequencies: this.commonFrequencies,
      schedule: this.schedule,
      isActive: this.isActive,
      addedDate: this.addedDate,
    };
  }

  // Create from JSON object
  static fromJSON(data: any): Medicine {
    const medicine = new Medicine(data);
    medicine.isActive = data.isActive || false;
    medicine.addedDate = data.addedDate ? new Date(data.addedDate) : undefined;
    return medicine;
  }
}
