import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Photo } from '../../types';

interface PhotoModalProps {
    isOpen: boolean;
    onClose: () => void;
    photo: Photo | null;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ isOpen, onClose, photo }) => {
    return (
        <AnimatePresence>
            {isOpen && photo && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    aria-modal="true"
                    role="dialog"
                >
                    <motion.div
                        className="relative"
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={photo.imageUrl}
                            alt={photo.caption}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
                           <p className="text-white font-semibold text-center">{photo.caption}</p>
                        </div>
                    </motion.div>
                     <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white text-2xl font-bold bg-black/30 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/60 transition-colors"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
