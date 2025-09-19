import React, { useState, useEffect } from 'react';
import type { Pet } from '../../types';
import { Species } from '../../types';

interface EditPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdatePet: (pet: Pet) => void;
  pet: Pet | null;
}

export const EditPetModal: React.FC<EditPetModalProps> = ({ isOpen, onClose, onUpdatePet, pet }) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<Species>(Species.Dog);
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (pet) {
      setName(pet.name);
      setSpecies(pet.species);
      setBreed(pet.breed);
      setAge(pet.age);
      setAvatarUrl(pet.avatarUrl);
    }
  }, [pet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pet || !name || !breed || age === '' || age < 0) return;

    onUpdatePet({
      ...pet,
      name,
      species,
      breed,
      age: Number(age),
      avatarUrl,
    });
  };

  if (!isOpen || !pet) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" 
      onClick={onClose} 
      aria-modal="true" 
      role="dialog"
    >
      <div 
        className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md m-4 transform transition-all" 
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Edit {pet.name}'s Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-name" className="block text-sm font-medium text-slate-600 mb-1">Name</label>
            <input
              type="text"
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="edit-species" className="block text-sm font-medium text-slate-600 mb-1">Species</label>
            <select
              id="edit-species"
              value={species}
              onChange={(e) => setSpecies(e.target.value as Species)}
              className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
            >
              {Object.values(Species).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="edit-breed" className="block text-sm font-medium text-slate-600 mb-1">Breed</label>
            <input
              type="text"
              id="edit-breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="edit-age" className="block text-sm font-medium text-slate-600 mb-1">Age (in years)</label>
            <input
              type="number"
              id="edit-age"
              value={age}
              onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              min="0"
              required
            />
          </div>
          <div>
            <label htmlFor="edit-avatarUrl" className="block text-sm font-medium text-slate-600 mb-1">Avatar URL</label>
            <input
              type="url"
              id="edit-avatarUrl"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="e.g., https://example.com/image.png"
              className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};