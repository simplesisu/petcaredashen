import React from 'react';
import { usePetStore } from '../store/petStore';
import { useUIStore } from '../store/uiStore';
import { MyPetsPage } from '../components/MyPetsPage';

export const MyPetsListPage: React.FC = () => {
    const { pets, deletePet } = usePetStore();
    const { openAddPetModal, openEditPetModal } = useUIStore();

    return (
        <MyPetsPage
            pets={pets}
            onAddPet={openAddPetModal}
            onEditPet={openEditPetModal}
            onDeletePet={deletePet}
        />
    );
};
