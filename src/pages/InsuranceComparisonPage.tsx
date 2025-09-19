import React, { useState, useEffect } from 'react';
import { usePetStore } from '../store/petStore';
import { InsurancePage } from '../components/InsurancePage';
import type { Pet, InsuranceQuote } from '../types';
import { generateQuotesForPet } from '../utils/insuranceUtils';
import { Logger } from '../services/loggingService';

export const InsuranceComparisonPage: React.FC = () => {
    const { pets } = usePetStore();
    const [selectedPet, setSelectedPet] = useState<Pet | undefined>(pets[0]);
    const [quotes, setQuotes] = useState<InsuranceQuote[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!selectedPet && pets.length > 0) {
            setSelectedPet(pets[0]);
        }
    }, [pets, selectedPet]);

    const handleFetchQuotes = () => {
        if (!selectedPet) return;

        Logger.info('Fetching insurance quotes for pet:', { petId: selectedPet.id, petName: selectedPet.name });
        setIsLoading(true);
        setError(null);
        setQuotes(null);

        // Simulate a network delay for a better user experience
        setTimeout(() => {
            try {
                const generatedQuotes = generateQuotesForPet(selectedPet);
                if (generatedQuotes.length === 0) {
                    const errorMessage = `Sorry, we couldn't find any insurance plans for ${selectedPet.species}s.`;
                    setError(errorMessage);
                    Logger.warn('No insurance quotes found for pet', { pet: selectedPet });
                } else {
                    setQuotes(generatedQuotes);
                    Logger.info('Successfully generated insurance quotes', { petId: selectedPet.id, count: generatedQuotes.length });
                }
            } catch (e) {
                console.error(e);
                const errorMessage = "An unexpected error occurred while generating quotes.";
                setError(errorMessage);
                Logger.error(errorMessage, e);
            } finally {
                setIsLoading(false);
            }
        }, 700); // 0.7 second delay
    };
    
    return (
        <InsurancePage
            pets={pets}
            selectedPet={selectedPet}
            onSelectPet={setSelectedPet}
            quotes={quotes}
            isLoading={isLoading}
            error={error}
            onFetchQuotes={handleFetchQuotes}
        />
    );
};