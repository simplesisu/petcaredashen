export enum Species {
  Dog = 'Dog',
  Cat = 'Cat',
  Bird = 'Bird',
  Rabbit = 'Rabbit',
}

export interface Pet {
  id: number;
  name: string;
  species: Species;
  breed: string;
  age: number;
  avatarUrl: string;
}

export interface Appointment {
  id: number;
  petId: number;
  date: string;
  reason: string;
  vetName: string;
  notes?: string;
}

export interface Medication {
  id: number;
  petId: number;
  name: string;
  dosage: string;
  frequency: string;
  endDate: string;
}

export interface HealthMetric {
  id: number;
  petId: number;
  date: string; // "YYYY-MM-DD"
  weight: number; // in kg
  temperature?: number; // in Celsius
  notes?: string;
}

export interface Document {
  id: number;
  petId: number;
  name: string;
  uploadDate: string;
  fileUrl: string; // In a real app, this would point to a storage location
  category: 'Medical' | 'Insurance' | 'Receipt' | 'Other';
}

export interface Photo {
  id: number;
  petId: number;
  imageUrl: string;
  caption: string;
}

export interface InsuranceQuote {
  companyName: string;
  monthlyPremium: number;
  vetCareCoverage: number;
  deductible: string;
  isRecommended: boolean;
  keyFeatures: string[];
  recommendationReason?: string;
}

export interface InsurancePlan {
  companyName: string;
  planName: string;
  applicableSpecies: Species[];
  basePremium: {
    dog: number;
    cat: number;
  };
  vetCareCoverage: number;
  deductible: string;
  keyFeatures: string[];
}