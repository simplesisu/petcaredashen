import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Pet } from '../types';
import { Card } from './Card';

interface PetProfileCardProps {
  pet: Pet;
}

export const PetProfileCard: React.FC<PetProfileCardProps> = ({ pet }) => {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col items-center text-center">
      <img
        src={pet.avatarUrl}
        alt={pet.name}
        className="h-32 w-32 rounded-full object-cover mb-4 ring-4 ring-indigo-200/50"
      />
      <h2 className="text-2xl font-bold text-slate-800">{pet.name}</h2>
      <p className="text-slate-500">{pet.breed}</p>
      
      <div className="w-full flex justify-around mt-6 pt-6 border-t border-slate-100">
        <div className="text-center">
            <p className="text-sm text-slate-500">Age</p>
            <p className="font-bold text-lg text-slate-700">{pet.age} yrs</p>
        </div>
        <div className="text-center">
            <p className="text-sm text-slate-500">Species</p>
            <p className="font-bold text-lg text-slate-700">{pet.species}</p>
        </div>
      </div>
      <button 
        onClick={() => navigate(`/pets/${pet.id}`)}
        className="mt-6 w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow-md"
      >
        View Full Profile
      </button>
    </Card>
  );
};
