import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { usePetStore } from '../../store/petStore';
import { AddPetModal, EditPetModal, UploadDocumentModal, PhotoModal, AddMedicationModal } from '.';
import type { Pet, Document, Medication } from '../../types';

export const ModalsManager: React.FC = () => {
    const { 
        isAddPetModalOpen, closeAddPetModal, 
        isEditPetModalOpen, closeEditPetModal, petToEdit,
        isUploadModalOpen, closeUploadModal, petForUpload,
        isPhotoModalOpen, closePhotoModal, photoToShow,
        isAddMedicationModalOpen, closeAddMedicationModal, petForMedication
    } = useUIStore();

    const { addPet, updatePet, addDocument, addMedication } = usePetStore();

    const handleAddPet = (pet: Omit<Pet, 'id'>) => {
        addPet(pet);
        closeAddPetModal();
    };

    const handleUpdatePet = (pet: Pet) => {
        updatePet(pet);
        closeEditPetModal();
    };
    
    const handleUploadDocument = (doc: Omit<Document, 'id'>) => {
        addDocument(doc);
        closeUploadModal();
    };

    const handleAddMedication = (med: Omit<Medication, 'id'>) => {
        addMedication(med);
        closeAddMedicationModal();
    };
    
    return (
        <>
            <AddPetModal 
                isOpen={isAddPetModalOpen}
                onClose={closeAddPetModal}
                onAddPet={handleAddPet}
            />
            <EditPetModal
                isOpen={isEditPetModalOpen}
                onClose={closeEditPetModal}
                pet={petToEdit}
                onUpdatePet={handleUpdatePet}
            />
            {petForUpload && (
                <UploadDocumentModal
                    isOpen={isUploadModalOpen}
                    onClose={closeUploadModal}
                    petId={petForUpload.id}
                    onUpload={handleUploadDocument}
                />
            )}
            {petForMedication && (
                 <AddMedicationModal
                    isOpen={isAddMedicationModalOpen}
                    onClose={closeAddMedicationModal}
                    petId={petForMedication.id}
                    onAddMedication={handleAddMedication}
                />
            )}
            <PhotoModal 
                isOpen={isPhotoModalOpen}
                onClose={closePhotoModal}
                photo={photoToShow}
            />
        </>
    );
};
