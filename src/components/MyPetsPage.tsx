import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import type { Pet } from '../types';
import { Card } from './Card';
import { PlusIcon } from './IconComponents';

interface MyPetsPageProps {
  pets: Pet[];
  onAddPet: () => void;
  onEditPet: (pet: Pet) => void;
  onDeletePet: (petId: number) => void;
}

const DeleteConfirmation: React.FC<{ petName: string; onConfirm: () => void; onCancel: () => void; }> = ({ petName, onConfirm, onCancel }) => (
    <div className="flex flex-col items-center gap-2">
        <p className="font-semibold">Delete {petName}?</p>
        <p className="text-sm text-slate-500">This action cannot be undone.</p>
        <div className="flex gap-2 mt-2">
            <button 
                onClick={onConfirm}
                className="w-20 text-sm font-semibold py-1.5 px-4 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
                Delete
            </button>
            <button 
                onClick={onCancel}
                className="w-20 text-sm font-semibold py-1.5 px-4 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
                Cancel
            </button>
        </div>
    </div>
);

const PetGridCard: React.FC<{ pet: Pet; onEdit: () => void; onDelete: () => void; onView: () => void; }> = React.memo(({ pet, onEdit, onDelete, onView }) => {
    
    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click when deleting
        
        toast((t) => (
            <DeleteConfirmation 
                petName={pet.name}
                onConfirm={() => {
                    onDelete();
                    toast.dismiss(t.id);
                }}
                onCancel={() => toast.dismiss(t.id)}
            />
        ), { duration: 10000 });
    };

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click when editing
        onEdit();
    };
    
    return (
        <motion.div
            className="flex flex-col text-center"
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
             <Card 
                className="flex flex-col text-center cursor-pointer h-full"
                onClick={onView}
            >
                <img
                    src={pet.avatarUrl}
                    alt={pet.name}
                    className="h-28 w-28 rounded-full object-cover mb-4 mx-auto ring-4 ring-indigo-200/50"
                />
                <div className="flex-grow">
                    <h2 className="text-xl font-bold text-slate-800">{pet.name}</h2>
                    <p className="text-slate-500">{pet.breed}</p>
                    <p className="text-sm text-slate-400 mt-2">{pet.age} years old</p>
                </div>
                <div className="flex justify-center space-x-2 mt-6 pt-4 border-t border-slate-100">
                    <button 
                        onClick={handleEditClick}
                        className="w-full text-sm font-semibold py-2 px-4 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                        Edit
                    </button>
                    <button 
                        onClick={handleDeleteClick}
                        className="w-full text-sm font-semibold py-2 px-4 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </Card>
        </motion.div>
    )
});

export const MyPetsPage: React.FC<MyPetsPageProps> = ({ pets, onAddPet, onEditPet, onDeletePet }) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">My Pets</h1>
        <button 
          onClick={onAddPet}
          className="flex items-center space-x-2 bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add New Pet</span>
        </button>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } }
        }}
        initial="hidden"
        animate="visible"
      >
        {pets.map(pet => (
          <motion.div key={pet.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <PetGridCard 
              pet={pet}
              onView={() => navigate(`/pets/${pet.id}`)}
              onEdit={() => onEditPet(pet)} 
              onDelete={() => onDeletePet(pet.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
