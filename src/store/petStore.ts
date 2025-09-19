import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import { GoogleGenAI, Type } from '@google/genai';
import type { Pet, Appointment, Medication, HealthMetric, Document, Photo } from '../types';
import { mockData } from '../constants';
import { Logger } from '../services/loggingService';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

interface PetState {
    pets: Pet[];
    appointments: Appointment[];
    medications: Medication[];
    healthMetrics: HealthMetric[];
    documents: Document[];
    photos: Photo[];
    newlyAddedPetId: number | null;
    addPet: (pet: Omit<Pet, 'id'>) => void;
    updatePet: (pet: Pet) => void;
    deletePet: (petId: number) => void;
    addDocument: (doc: Omit<Document, 'id'>) => void;
    addMedication: (med: Omit<Medication, 'id'>) => void;
    clearNewlyAddedPet: () => void;
    getCareTips: (pet: Pet) => Promise<string[]>;
}

export const usePetStore = create<PetState>()(
    devtools(
        persist(
            (set, get) => ({
                ...mockData,
                newlyAddedPetId: null,

                addPet: (pet) => {
                    Logger.info('Attempting to add pet', pet);
                    const newPet: Pet = {
                        ...pet,
                        id: Math.max(...get().pets.map(p => p.id), 0) + 1,
                    };
                    set((state) => ({
                        pets: [...state.pets, newPet],
                        newlyAddedPetId: newPet.id,
                    }));
                    toast.success(`${pet.name} has been added to your family!`);
                    Logger.info('Successfully added pet', { petId: newPet.id });
                },

                updatePet: (updatedPet) => {
                    Logger.info('Attempting to update pet', { petId: updatedPet.id });
                    set((state) => ({
                        pets: state.pets.map(p => (p.id === updatedPet.id ? updatedPet : p)),
                    }));
                    toast.success(`${updatedPet.name}'s details have been updated.`);
                    Logger.info('Successfully updated pet', { petId: updatedPet.id });
                },

                deletePet: (petId) => {
                    const petName = get().pets.find(p => p.id === petId)?.name || 'The pet';
                    Logger.info('Attempting to delete pet', { petId, petName });
                    set((state) => ({
                        pets: state.pets.filter(p => p.id !== petId),
                        appointments: state.appointments.filter(a => a.petId !== petId),
                        medications: state.medications.filter(m => m.petId !== petId),
                        healthMetrics: state.healthMetrics.filter(h => h.petId !== petId),
                        documents: state.documents.filter(d => d.petId !== petId),
                        photos: state.photos.filter(p => p.petId !== petId),
                    }));
                    toast.success(`${petName} has been removed.`);
                    Logger.info('Successfully deleted pet and associated data', { petId });
                },

                addDocument: (doc) => {
                    Logger.info('Attempting to add document', doc);
                    const newDoc: Document = {
                        ...doc,
                        id: Math.max(...get().documents.map(d => d.id), 0) + 1,
                    };
                    set((state) => ({
                        documents: [...state.documents, newDoc],
                    }));
                    toast.success(`Document "${doc.name}" has been uploaded.`);
                    Logger.info('Successfully added document', { docId: newDoc.id, petId: newDoc.petId });
                },
                
                addMedication: (med) => {
                    Logger.info('Attempting to add medication', med);
                    const newMed: Medication = {
                        ...med,
                        id: Math.max(...get().medications.map(m => m.id), 0) + 1,
                    };
                    set((state) => ({
                        medications: [...state.medications, newMed],
                    }));
                    toast.success(`Medication "${med.name}" has been added.`);
                    Logger.info('Successfully added medication', { medId: newMed.id, petId: newMed.petId });
                },

                clearNewlyAddedPet: () => {
                    if(get().newlyAddedPetId) {
                        Logger.info('Clearing newly added pet ID');
                        set({ newlyAddedPetId: null });
                    }
                },

                getCareTips: async (pet: Pet): Promise<string[]> => {
                    Logger.info('Generating care tips for pet:', pet.name);
                    const prompt = `Provide 5 concise, actionable health and wellness tips for a ${pet.age}-year-old ${pet.breed} (${pet.species}). Focus on diet, exercise, and enrichment.`;
                    try {
                         const response = await ai.models.generateContent({
                            model: "gemini-2.5-flash",
                            contents: prompt,
                            config: {
                                responseMimeType: "application/json",
                                responseSchema: {
                                    type: Type.OBJECT,
                                    properties: {
                                        tips: {
                                            type: Type.ARRAY,
                                            items: { type: Type.STRING }
                                        }
                                    }
                                }
                            }
                        });
                        
                        const jsonText = response.text.trim();
                        const parsed = JSON.parse(jsonText);
                        
                        if (parsed && Array.isArray(parsed.tips)) {
                            Logger.info('Successfully generated care tips.', { tips: parsed.tips });
                            return parsed.tips;
                        }
                        throw new Error('Invalid JSON structure in AI response');
                    } catch (error) {
                        Logger.error('Error generating care tips from Gemini:', error);
                        toast.error("Couldn't generate care tips at this time.");
                        return [];
                    }
                },
            }),
            {
                name: 'pet-care-storage',
            }
        )
    )
);
