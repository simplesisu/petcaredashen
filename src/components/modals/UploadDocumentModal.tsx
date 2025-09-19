import React, { useState } from 'react';
import type { Document } from '../../types';

interface UploadDocumentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (document: Omit<Document, 'id'>) => void;
    petId: number;
}

export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({ isOpen, onClose, onUpload, petId }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState<Document['category']>('Medical');
    const [fileUrl, setFileUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !category || !fileUrl) {
            alert("Please fill out all fields.");
            return;
        }

        onUpload({
            petId,
            name,
            category,
            uploadDate: new Date().toISOString(),
            fileUrl,
        });

        setName('');
        setCategory('Medical');
        setFileUrl('');
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
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Upload Document</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="doc-name" className="block text-sm font-medium text-slate-600 mb-1">Document Name</label>
                        <input
                            type="text"
                            id="doc-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="doc-category" className="block text-sm font-medium text-slate-600 mb-1">Category</label>
                        <select
                            id="doc-category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value as Document['category'])}
                            className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                        >
                            <option value="Medical">Medical</option>
                            <option value="Insurance">Insurance</option>
                            <option value="Receipt">Receipt</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="file-url" className="block text-sm font-medium text-slate-600 mb-1">File URL</label>
                        <input
                            type="url"
                            id="file-url"
                            value={fileUrl}
                            onChange={(e) => setFileUrl(e.target.value)}
                            placeholder="https://example.com/document.pdf"
                            className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-6 py-2 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md">
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};