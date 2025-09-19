import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePetStore } from '../store/petStore';
import { useUIStore } from '../store/uiStore';
import { PetProfilePage } from '../components/PetProfilePage';

export const PetProfilePageWrapper: React.FC = () => {
    const { petId } = useParams<{ petId: string }>();
    const navigate = useNavigate();
    const { pets, appointments, medications, healthMetrics, documents, photos } = usePetStore();
    const { openUploadModal, openAddMedicationModal } = useUIStore();

    const pet = pets.find(p => p.id === Number(petId));

    if (!pet) {
        return <div className="p-8 text-center text-slate-600">Pet not found.</div>;
    }

    const petAppointments = appointments.filter(a => a.petId === pet.id);
    const petMedications = medications.filter(m => m.petId === pet.id);
    const petHealthMetrics = healthMetrics.filter(h => h.petId === pet.id);
    const petDocuments = documents.filter(d => d.petId === pet.id);
    const petPhotos = photos.filter(p => p.petId === pet.id);

    return (
        <PetProfilePage
            pet={pet}
            appointments={petAppointments}
            medications={petMedications}
            healthMetrics={petHealthMetrics}
            documents={petDocuments}
            photos={petPhotos}
            onBack={() => navigate(-1)}
            onUploadDocument={() => openUploadModal(pet)}
            onAddMedication={() => openAddMedicationModal(pet)}
        />
    );
};