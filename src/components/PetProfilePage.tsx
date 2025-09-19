import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Pet, Appointment, Medication, HealthMetric, Document, Photo } from '../types';
import { ArrowLeftIcon, DocumentIcon, DownloadIcon, UploadIcon, SparklesIcon } from './IconComponents';
import { Card, CardHeader } from './Card';
import { HealthOverview } from './HealthOverview';
import { UpcomingEvents } from './UpcomingEvents';
import { MedicationList } from './MedicationList';
import { CareTips } from './CareTips';
import { useUIStore } from '../store/uiStore';
import { formatDate } from '../utils/dateUtils';

interface PetProfilePageProps {
    pet: Pet;
    appointments: Appointment[];
    medications: Medication[];
    healthMetrics: HealthMetric[];
    documents: Document[];
    photos: Photo[];
    onBack: () => void;
    onUploadDocument: () => void;
    onAddMedication: () => void;
}

const ProfileHeader: React.FC<{ pet: Pet; onBack: () => void }> = ({ pet, onBack }) => {
    const { generateCareTips, isGeneratingTips } = useUIStore();
    
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-start space-x-6">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 mt-2">
                    <ArrowLeftIcon className="h-6 w-6" />
                </button>
                <div className="flex items-center space-x-6">
                    <img
                        src={pet.avatarUrl}
                        alt={pet.name}
                        className="h-28 w-28 rounded-full object-cover ring-4 ring-white"
                    />
                    <div>
                        <h1 className="text-4xl font-bold text-slate-800">{pet.name}</h1>
                        <p className="text-lg text-slate-500">{pet.breed}</p>
                        <div className="flex space-x-4 mt-2 text-slate-600">
                            <span>{pet.species}</span>
                            <span>&bull;</span>
                            <span>{pet.age} years old</span>
                        </div>
                    </div>
                </div>
            </div>
             <button
                onClick={() => generateCareTips(pet)}
                disabled={isGeneratingTips}
                className="flex items-center space-x-2 bg-indigo-50 text-indigo-600 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50 disabled:cursor-wait self-end sm:self-center"
            >
                <SparklesIcon className="h-5 w-5" />
                <span>{isGeneratingTips ? 'Generating...' : 'Generate Care Tips'}</span>
            </button>
        </div>
    );
}


const TabButton: React.FC<{ label: string; active: boolean; onClick: () => void }> = React.memo(({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 font-semibold rounded-md transition-colors relative ${
            active ? 'text-indigo-700' : 'text-slate-500 hover:bg-slate-100'
        }`}
    >
        {label}
        {active && <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" layoutId="underline" />}
    </button>
));

const DocumentList: React.FC<{ documents: Document[], onUpload: () => void }> = ({ documents, onUpload }) => (
    <Card>
        <CardHeader
            icon={<DocumentIcon className="h-5 w-5" />}
            title="Documents"
            action={
                <button
                    onClick={onUpload}
                    className="flex items-center space-x-2 text-sm bg-indigo-50 text-indigo-600 font-semibold py-2 px-3 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                    <UploadIcon className="h-4 w-4" />
                    <span>Upload</span>
                </button>
            }
        />
        <div className="space-y-3">
            {documents.length > 0 ? documents.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
                    <div>
                        <p className="font-semibold text-slate-700">{doc.name}</p>
                        <p className="text-sm text-slate-400">{doc.category} &bull; Uploaded on {formatDate(doc.uploadDate)}</p>
                    </div>
                    <a href={doc.fileUrl} download className="p-2 rounded-full hover:bg-slate-200 text-slate-500">
                        <DownloadIcon className="h-5 w-5" />
                    </a>
                </div>
            )) : (
                <p className="text-center text-slate-500 py-8">No documents uploaded yet.</p>
            )}
        </div>
    </Card>
);

const PhotoGallery: React.FC<{ photos: Photo[] }> = ({ photos }) => {
    const openPhotoModal = useUIStore(state => state.openPhotoModal);

    return (
        <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            initial="hidden"
            animate="visible"
        >
            {photos.map(photo => (
                <motion.div 
                    key={photo.id}
                    className="group relative overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => openPhotoModal(photo)}
                    variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                    whileHover={{ scale: 1.05 }}
                >
                    <img src={photo.imageUrl} alt={photo.caption} className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <p className="absolute bottom-0 left-0 p-3 text-white text-sm font-semibold">{photo.caption}</p>
                </motion.div>
            ))}
        </motion.div>
    );
}

export const PetProfilePage: React.FC<PetProfilePageProps> = ({ pet, appointments, medications, healthMetrics, documents, photos, onBack, onUploadDocument, onAddMedication }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const { careTips, isGeneratingTips } = useUIStore();

    return (
        <div className="space-y-6">
            <ProfileHeader pet={pet} onBack={onBack} />
            
            <div className="flex space-x-2 border-b border-slate-200">
                <TabButton label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                <TabButton label="Medications" active={activeTab === 'medications'} onClick={() => setActiveTab('medications')} />
                <TabButton label="Documents" active={activeTab === 'documents'} onClick={() => setActiveTab('documents')} />
                <TabButton label="Gallery" active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'overview' && (
                         <div className="space-y-8">
                            <AnimatePresence>
                                {(isGeneratingTips || (careTips && careTips.petId === pet.id)) && (
                                     <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                     >
                                        <CareTips pet={pet} tips={careTips?.tips ?? []} isLoading={isGeneratingTips} />
                                     </motion.div>
                                )}
                            </AnimatePresence>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2">
                                    <HealthOverview healthMetrics={healthMetrics} />
                                </div>
                                <div className="lg:col-span-1">
                                    <UpcomingEvents appointments={appointments} medications={medications} />
                                </div>
                            </div>
                         </div>
                    )}
                    {activeTab === 'medications' && (
                        <MedicationList medications={medications} onAdd={onAddMedication} />
                    )}
                    {activeTab === 'documents' && (
                        <DocumentList documents={documents} onUpload={onUploadDocument} />
                    )}
                    {activeTab === 'gallery' && (
                       <PhotoGallery photos={photos} />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
