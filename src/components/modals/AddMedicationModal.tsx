import React, { useState } from 'react';
import type { Medication } from '../../types';

interface AddMedicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddMedication: (medication: Omit<Medication, 'id'>) => void;
    petId: number;
}

export const AddMedicationModal: React.FC<AddMedicationModalProps> = ({ isOpen, onClose, onAddMedication, petId }) => {
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !dosage || !frequency || !endDate) {
            return;
        }

        onAddMedication({
            petId,
            name,
            dosage,
            frequency,
            endDate,
        });

        // Reset form
        setName('');
        setDosage('');
        setFrequency('');
        setEndDate('');
    };
    
    if (!isOpen) return null;

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
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Add New Medication</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="med-name" className="block text-sm font-medium text-slate-600 mb-1">Medication Name</label>
                        <input
                            type="text"
                            id="med-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="med-dosage" className="block text-sm font-medium text-slate-600 mb-1">Dosage</label>
                        <input
                            type="text"
                            id="med-dosage"
                            value={dosage}
                            placeholder="e.g., 1 tablet, 5ml"
                            onChange={(e) => setDosage(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="med-frequency" className="block text-sm font-medium text-slate-600 mb-1">Frequency</label>
                        <input
                            type="text"
                            id="med-frequency"
                            value={frequency}
                            placeholder="e.g., Twice a day, Monthly"
                            onChange={(e) => setFrequency(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="med-endDate" className="block text-sm font-medium text-slate-600 mb-1">End Date</label>
                        <input
                            type="date"
                            id="med-endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-6 py-2 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md">
                            Add Medication
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};