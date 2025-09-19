
import type { Pet, Appointment, Medication, HealthMetric, Document, Photo } from './types';
import { Species } from './types';

const pets: Pet[] = [
  { id: 1, name: 'Buddy', species: Species.Dog, breed: 'Golden Retriever', age: 5, avatarUrl: 'https://picsum.photos/id/237/200/200' },
  { id: 2, name: 'Lucy', species: Species.Cat, breed: 'Siamese', age: 3, avatarUrl: 'https://picsum.photos/id/1074/200/200' },
  { id: 3, name: 'Rocky', species: Species.Dog, breed: 'German Shepherd', age: 7, avatarUrl: 'https://picsum.photos/id/1025/200/200' },
  { id: 4, name: 'Charlie', species: Species.Bird, breed: 'Parakeet', age: 2, avatarUrl: 'https://picsum.photos/id/1024/200/200' },
  { id: 5, name: 'Max', species: Species.Dog, breed: 'Beagle', age: 4, avatarUrl: 'https://picsum.photos/id/1062/200/200' },
  { id: 6, name: 'Whiskers', species: Species.Rabbit, breed: 'Holland Lop', age: 1, avatarUrl: 'https://picsum.photos/id/431/200/200' },
];

const appointments: Appointment[] = [
  { id: 1, petId: 1, date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(), reason: 'Annual Checkup', vetName: 'Dr. Smith' },
  { id: 2, petId: 2, date: new Date(new Date().setDate(new Date().getDate() + 12)).toISOString(), reason: 'Vaccination', vetName: 'Dr. Jones' },
  { id: 3, petId: 1, date: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString(), reason: 'Dental Cleaning', vetName: 'Dr. Smith' },
  { id: 4, petId: 3, date: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString(), reason: 'Joint Pain Follow-up', vetName: 'Dr. Davis' },
  { id: 5, petId: 5, date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(), reason: 'Skin Rash', vetName: 'Dr. Jones' },
  { id: 6, petId: 4, date: new Date(new Date().setDate(new Date().getDate() + 25)).toISOString(), reason: 'Wing Clipping', vetName: 'Dr. Avian' },
  { id: 7, petId: 6, date: new Date(new Date().setDate(new Date().getDate() + 18)).toISOString(), reason: 'Nail Trim', vetName: 'Vet Tech' },
];

const medications: Medication[] = [
  { id: 1, petId: 1, name: 'Flea & Tick Prevention', dosage: '1 tablet', frequency: 'Monthly', endDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString() },
  { id: 2, petId: 3, name: 'Joint Supplement', dosage: '1 chew', frequency: 'Daily', endDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString() },
  { id: 3, petId: 2, name: 'Allergy Medication', dosage: '0.5ml', frequency: 'Twice a day', endDate: new Date(new Date().setDate(new Date().getDate() + 8)).toISOString() },
  { id: 4, petId: 5, name: 'Topical Cream for Rash', dosage: 'Apply twice daily', frequency: 'Daily', endDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString() },
  { id: 5, petId: 1, name: 'Ear Drops', dosage: '2 drops per ear', frequency: 'Daily', endDate: new Date(new Date().setDate(new Date().getDate() + 6)).toISOString() },
  { id: 6, petId: 4, name: 'Vitamin Supplement', dosage: '1 drop in water', frequency: 'Daily', endDate: new Date(new Date().setDate(new Date().getDate() + 60)).toISOString() },
];

const healthMetrics: HealthMetric[] = [
  // Buddy (Pet 1) - Golden Retriever
  { id: 1, petId: 1, date: '2023-08-15', weight: 30.1, temperature: 38.6 },
  { id: 2, petId: 1, date: '2023-09-15', weight: 30.5, temperature: 38.5 },
  { id: 3, petId: 1, date: '2023-10-15', weight: 30.8, temperature: 38.7 },
  { id: 4, petId: 1, date: '2023-11-15', weight: 31.2 },
  { id: 5, petId: 1, date: '2023-12-15', weight: 31.1, temperature: 38.5 },
  { id: 21, petId: 1, date: '2024-01-15', weight: 31.5, temperature: 38.6 },
  { id: 22, petId: 1, date: '2024-02-15', weight: 31.6, temperature: 38.4 },
  { id: 23, petId: 1, date: '2024-03-15', weight: 31.4 },
  { id: 24, petId: 1, date: '2024-04-15', weight: 31.7, temperature: 38.8 },
  { id: 25, petId: 1, date: '2024-05-15', weight: 31.5, temperature: 38.5 },

  // Lucy (Pet 2) - Siamese
  { id: 6, petId: 2, date: '2023-09-01', weight: 4.5, temperature: 38.7 },
  { id: 7, petId: 2, date: '2023-11-01', weight: 4.6 },
  { id: 8, petId: 2, date: '2024-01-01', weight: 4.7, temperature: 38.6 },
  { id: 26, petId: 2, date: '2024-03-01', weight: 4.8 },
  { id: 27, petId: 2, date: '2024-05-01', weight: 4.7, temperature: 38.8 },
  
  // Rocky (Pet 3) - German Shepherd
  { id: 9, petId: 3, date: '2023-07-10', weight: 36.0, temperature: 38.3 },
  { id: 10, petId: 3, date: '2023-09-10', weight: 35.8, temperature: 38.5 },
  { id: 11, petId: 3, date: '2023-11-10', weight: 35.5 },
  { id: 28, petId: 3, date: '2024-01-10', weight: 35.1, temperature: 38.4 },
  { id: 29, petId: 3, date: '2024-03-10', weight: 34.9 },
  { id: 30, petId: 3, date: '2024-05-10', weight: 34.8, temperature: 38.6 },

  // Charlie (Pet 4) - Parakeet
  { id: 12, petId: 4, date: '2023-10-20', weight: 0.085, temperature: 41.2 },
  { id: 13, petId: 4, date: '2023-12-20', weight: 0.088 },
  { id: 14, petId: 4, date: '2024-02-20', weight: 0.090, temperature: 41.0 },
  { id: 31, petId: 4, date: '2024-04-20', weight: 0.091, temperature: 41.1 },
  
  // Max (Pet 5) - Beagle
  { id: 15, petId: 5, date: '2023-06-25', weight: 12.0, temperature: 38.5 },
  { id: 16, petId: 5, date: '2023-08-25', weight: 12.1 },
  { id: 17, petId: 5, date: '2023-10-25', weight: 12.3, temperature: 38.7 },
  { id: 18, petId: 5, date: '2023-12-25', weight: 12.5 },
  { id: 32, petId: 5, date: '2024-02-25', weight: 12.4, temperature: 38.6 },
  { id: 33, petId: 5, date: '2024-04-25', weight: 12.6, temperature: 38.8 },

  // Whiskers (Pet 6) - Holland Lop
  { id: 19, petId: 6, date: '2023-12-05', weight: 1.5, temperature: 38.8 },
  { id: 20, petId: 6, date: '2024-02-05', weight: 1.6, temperature: 39.0 },
  { id: 34, petId: 6, date: '2024-04-05', weight: 1.65 },
  { id: 35, petId: 6, date: '2024-05-05', weight: 1.7, temperature: 39.1 },
];

const documents: Document[] = [
    { id: 1, petId: 1, name: 'Vaccination Record 2024', uploadDate: '2024-01-20', fileUrl: '#', category: 'Medical' },
    { id: 2, petId: 1, name: 'PetSure Insurance Policy', uploadDate: '2023-06-05', fileUrl: '#', category: 'Insurance' },
    { id: 3, petId: 2, name: 'Vet Visit Receipt', uploadDate: '2024-03-01', fileUrl: '#', category: 'Receipt' },
    { id: 4, petId: 3, name: 'Rabies Certificate', uploadDate: '2023-09-15', fileUrl: '#', category: 'Medical' },
];

const photos: Photo[] = [
    { id: 1, petId: 1, imageUrl: 'https://picsum.photos/id/1025/400/400', caption: 'Enjoying the park!' },
    { id: 2, petId: 1, imageUrl: 'https://picsum.photos/id/1062/400/400', caption: 'Nap time' },
    { id: 3, petId: 1, imageUrl: 'https://picsum.photos/id/237/400/400', caption: 'My favorite toy' },
    { id: 4, petId: 2, imageUrl: 'https://picsum.photos/id/1074/400/400', caption: 'Sunbathing' },
    { id: 5, petId: 2, imageUrl: 'https://picsum.photos/id/593/400/400', caption: 'Curious kitty' },
    { id: 6, petId: 3, imageUrl: 'https://picsum.photos/id/1025/400/400', caption: 'On duty!' },
];

export const mockData = {
  pets,
  appointments,
  medications,
  healthMetrics,
  documents,
  photos,
};
