import React from 'react';
import type { Pet, Appointment, Medication, HealthMetric } from '../types';
import { PetSelector } from './PetSelector';
import { PetProfileCard } from './PetProfileCard';
import { HealthOverview } from './HealthOverview';
import { UpcomingEvents } from './UpcomingEvents';
import { QuickActions } from './QuickActions';

interface DashboardProps {
    pets: Pet[];
    selectedPet: Pet;
    onSelectPet: (pet: Pet) => void;
    appointments: Appointment[];
    medications: Medication[];
    healthMetrics: HealthMetric[];
}

export const Dashboard: React.FC<DashboardProps> = ({ pets, selectedPet, onSelectPet, appointments, medications, healthMetrics }) => {
    return (
        <div className="space-y-8">
            <PetSelector pets={pets} selectedPet={selectedPet} onSelectPet={onSelectPet} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-1 space-y-8">
                    <PetProfileCard pet={selectedPet} />
                    <QuickActions />
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-8">
                    <HealthOverview healthMetrics={healthMetrics} />
                    <UpcomingEvents appointments={appointments} medications={medications} />
                </div>
            </div>
        </div>
    );
};
