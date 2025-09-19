import { create } from 'zustand';
import type { Pet, Photo } from '../types';
import { usePetStore } from './petStore';

interface CareTipsState {
    petId: number;
    tips: string[];
}
interface UIState {
    isAddPetModalOpen: boolean;
    openAddPetModal: () => void;
    closeAddPetModal: () => void;

    isEditPetModalOpen: boolean;
    petToEdit: Pet | null;
    openEditPetModal: (pet: Pet) => void;
    closeEditPetModal: () => void;

    isUploadModalOpen: boolean;
    petForUpload: Pet | null;
    openUploadModal: (pet: Pet) => void;
    closeUploadModal: () => void;

    isAddMedicationModalOpen: boolean;
    petForMedication: Pet | null;
    openAddMedicationModal: (pet: Pet) => void;
    closeAddMedicationModal: () => void;

    isPhotoModalOpen: boolean;
    photoToShow: Photo | null;
    openPhotoModal: (photo: Photo) => void;
    closePhotoModal: () => void;

    isGeneratingTips: boolean;
    careTips: CareTipsState | null;
    generateCareTips: (pet: Pet) => Promise<void>;
    clearCareTips: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isAddPetModalOpen: false,
    openAddPetModal: () => set({ isAddPetModalOpen: true }),
    closeAddPetModal: () => set({ isAddPetModalOpen: false }),

    isEditPetModalOpen: false,
    petToEdit: null,
    openEditPetModal: (pet) => set({ isEditPetModalOpen: true, petToEdit: pet }),
    closeEditPetModal: () => set({ isEditPetModalOpen: false, petToEdit: null }),

    isUploadModalOpen: false,
    petForUpload: null,
    openUploadModal: (pet) => set({ isUploadModalOpen: true, petForUpload: pet }),
    closeUploadModal: () => set({ isUploadModalOpen: false, petForUpload: null }),

    isAddMedicationModalOpen: false,
    petForMedication: null,
    openAddMedicationModal: (pet) => set({ isAddMedicationModalOpen: true, petForMedication: pet }),
    closeAddMedicationModal: () => set({ isAddMedicationModalOpen: false, petForMedication: null }),

    isPhotoModalOpen: false,
    photoToShow: null,
    openPhotoModal: (photo) => set({ isPhotoModalOpen: true, photoToShow: photo }),
    closePhotoModal: () => set({ isPhotoModalOpen: false, photoToShow: null }),

    isGeneratingTips: false,
    careTips: null,
    generateCareTips: async (pet) => {
        set({ isGeneratingTips: true, careTips: null });
        try {
            const { getCareTips } = usePetStore.getState();
            const tips = await getCareTips(pet);
            set({ careTips: { petId: pet.id, tips } });
        } finally {
            set({ isGeneratingTips: false });
        }
    },
    clearCareTips: () => set({ careTips: null }),
}));
