import React from 'react';
import type { Pet } from '../types';
import { PlusIcon } from './IconComponents';
import { useUIStore } from '../store/uiStore';

interface PetSelectorProps {
  pets: Pet[];
  selectedPet: Pet;
  onSelectPet: (pet: Pet) => void;
}

export const PetSelector: React.FC<PetSelectorProps> = ({ pets, selectedPet, onSelectPet }) => {
  const openAddPetModal = useUIStore((state) => state.openAddPetModal);
  
  return (
    <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-4">
      {pets.map(pet => (
        <button
          key={pet.id}
          onClick={() => onSelectPet(pet)}
          className={`flex-shrink-0 flex items-center space-x-3 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
            selectedPet.id === pet.id
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <img src={pet.avatarUrl} alt={pet.name} className="h-8 w-8 rounded-full object-cover" />
          <span className="font-semibold text-sm sm:text-base">{pet.name}</span>
        </button>
      ))}
       <button 
        onClick={openAddPetModal}
        aria-label="Add new pet"
        className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-white hover:bg-indigo-100 text-indigo-500 transition-colors duration-200 shadow-sm">
        <PlusIcon className="h-6 w-6"/>
      </button>
    </div>
  );
};