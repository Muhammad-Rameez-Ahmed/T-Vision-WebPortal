
export interface DiseaseID {
    diseaseID: number;
    diseaseName: string;
    diseaseSymptoms: string;
    diseaseDescription: string;
    diseaseCreatedAt: Date;
    diseaseUpdatedAt: Date;
}

export interface DiagnosesDiseas {
    diagnosesDiseaseId: number;
    diseaseID: DiseaseID;
    diagnosesDiseaseCreatedAt: Date;
    diagnosesDiseaseUpdatedAt: Date;
}

export interface TestRecommendedBy {
    doctorName: string;
    doctorId: number;
}

export interface LabTest {
    testID: number;
    testRecommendedBy: TestRecommendedBy;
    testCreatedAt: Date;
    testResult?: any;
    testName: string;
}

export interface MedicineId {
    medicineId: number;
    medicineName: string;
    medicineDescription: string;
    medicineFormula: string;
    medicinePurpose: string;
    medicineCreatedAt: Date;
    medicineUpdatedAt: Date;
}

export interface PrescribeMedicine {
    prescribeMedicineId: number;
    medicineId: MedicineId;
    prescribeMedicineMorning: boolean;
    prescribeMedicineEvening: boolean;
    prescribeMedicineNight: boolean;
    prescribeMedicineNotes: string;
    prescribeMedicineDosage: string;
    prescribeMedicineTimeTaken: string;
    prescribeMedicineIsDailyDosage: boolean;
    prescribeMedicineCreatedAt: Date;
    prescribeMedicineUpdatedAt: Date;
}

export interface AllergyId {
    allergyId: number;
    allergyName: string;
    allergyTriggers: string;
    allergySymptoms: string;
    allergyTreatment: string;
    allergyCreatedAt: Date;
    allergyUpdatedAt: Date;
}

export interface DiagnosesAllergy {
    diagnosesAllergiesId: number;
    allergyId: AllergyId;
    diagnosesAllergiesCreatedAt: Date;
    diagnosesAllergiesUpdatedAt: Date;
}