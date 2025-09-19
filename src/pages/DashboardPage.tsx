import React, { useState, useEffect, useMemo } from 'react';
import { usePetStore } from '../store/petStore';
import { Dashboard } from '../components/Dashboard';
import { useUIStore } from '../store/uiStore';

export const DashboardPage: React.FC = () => {
    const { pets, appointments, medications, healthMetrics, newlyAddedPetId, clearNewlyAddedPet } = usePetStore();
    const { openAddPetModal } = useUIStore();
    const [selectedPetId, setSelectedPetId] = useState(pets[0]?.id || null);
    
    useEffect(() => {
        // If there's a newly added pet, select it.
        if (newlyAddedPetId) {
            setSelectedPetId(newlyAddedPetId);
            clearNewlyAddedPet();
        } else if (!selectedPetId && pets.length > 0) {
            // Default to the first pet if no pet is selected
            setSelectedPetId(pets[0].id);
        }
    }, [pets, newlyAddedPetId, clearNewlyAddedPet, selectedPetId]);

    const selectedPet = useMemo(() => pets.find(p => p.id === selectedPetId), [pets, selectedPetId]);

    if (pets.length === 0) {
        return (
            <div className="text-center p-12 bg-white rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-700">Welcome to PetCare!</h2>
                <p className="mt-2 text-slate-500">You don't have any pets yet. Add one to get started.</p>
                 <button 
                    onClick={openAddPetModal}
                    className="mt-6 bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                    Add Your First Pet
                </button>
            </div>
        );
    }
    
    if (!selectedPet) {
        return (
             <div className="text-center p-12">
                <p className="text-slate-500">Select a pet to view their dashboard.</p>
            </div>
        )
    }

    const petAppointments = appointments.filter(a => a.petId === selectedPet.id);
    const petMedications = medications.filter(m => m.petId === selectedPet.id);
    const petHealthMetrics = healthMetrics.filter(h => h.petId === selectedPet.id);

    return (
        <Dashboard 
            pets={pets}
            selectedPet={selectedPet}
            onSelectPet={(pet) => setSelectedPetId(pet.id)}
            appointments={petAppointments}
            medications={petMedications}
            healthMetrics={petHealthMetrics}
        />
    );
};
