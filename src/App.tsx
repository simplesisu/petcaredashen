import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { MainLayout } from './layouts/MainLayout';
import { DashboardPage } from './pages/DashboardPage';
import { MyPetsListPage } from './pages/MyPetsListPage';
import { PetProfilePageWrapper } from './pages/PetProfilePageWrapper';
import { InsuranceComparisonPage } from './pages/InsuranceComparisonPage';
import { ModalsManager } from './components/modals/ModalsManager';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<DashboardPage />} />
                        <Route path="pets" element={<MyPetsListPage />} />
                        <Route path="pets/:petId" element={<PetProfilePageWrapper />} />
                        <Route path="insurance" element={<InsuranceComparisonPage />} />
                        <Route path="*" element={<div className="p-8 text-center text-slate-600">Page not found.</div>} />
                    </Route>
                </Routes>
                <ModalsManager />
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;