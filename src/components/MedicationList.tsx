import React, { useMemo } from 'react';
import type { Medication } from '../types';
import { Card, CardHeader } from './Card';
import { MedicationIcon, PlusIcon } from './IconComponents';
import { AnimatePresence, motion } from 'framer-motion';
import { formatDate, isFutureDate } from '../utils/dateUtils';

interface MedicationListProps {
    medications: Medication[];
    onAdd: () => void;
}

const MedicationItem: React.FC<{ medication: Medication, isPast: boolean }> = ({ medication, isPast }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`flex items-center justify-between p-3 rounded-lg ${isPast ? 'opacity-60' : ''}`}
    >
        <div>
            <p className="font-semibold text-slate-700">{medication.name}</p>
            <p className="text-sm text-slate-500">{medication.dosage} &bull; {medication.frequency}</p>
        </div>
        <div className="text-right">
            <p className={`text-sm font-medium ${isPast ? 'text-slate-400' : 'text-slate-600'}`}>
                {isPast ? 'Ended on' : 'Ends on'}
            </p>
            <p className="text-xs text-slate-400">{formatDate(medication.endDate)}</p>
        </div>
    </motion.div>
);

export const MedicationList: React.FC<MedicationListProps> = ({ medications, onAdd }) => {
    const { currentMedications, pastMedications } = useMemo(() => {
        const sorted = [...medications].sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
        const current = sorted.filter(m => isFutureDate(m.endDate)).reverse();
        const past = sorted.filter(m => !isFutureDate(m.endDate));
        return { currentMedications: current, pastMedications: past };
    }, [medications]);

    return (
        <Card>
            <CardHeader
                icon={<MedicationIcon className="h-5 w-5" />}
                title="Medications"
                action={
                    <button
                        onClick={onAdd}
                        className="flex items-center space-x-2 text-sm bg-indigo-50 text-indigo-600 font-semibold py-2 px-3 rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                        <PlusIcon className="h-4 w-4" />
                        <span>Add Medication</span>
                    </button>
                }
            />
            {medications.length > 0 ? (
                <div className="space-y-4">
                    {currentMedications.length > 0 && (
                        <div>
                            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider px-3 mb-2">Current</h4>
                            <div className="divide-y divide-slate-100">
                                <AnimatePresence>
                                    {currentMedications.map(med => <MedicationItem key={med.id} medication={med} isPast={false} />)}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                     {pastMedications.length > 0 && (
                        <div>
                            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider px-3 mb-2 mt-6">Past</h4>
                             <div className="divide-y divide-slate-100">
                                <AnimatePresence>
                                    {pastMedications.map(med => <MedicationItem key={med.id} medication={med} isPast={true} />)}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center text-slate-500 py-12">
                    <p>No medication records found.</p>
                    <p className="text-sm mt-1">Add a medication to keep track of your pet's treatments.</p>
                </div>
            )}
        </Card>
    );
};
