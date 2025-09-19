import React from 'react';
import type { Pet, InsuranceQuote } from '../types';
import { Card } from './Card';
import { ShieldIcon } from './IconComponents';

interface InsurancePageProps {
    pets: Pet[];
    selectedPet: Pet | undefined;
    onSelectPet: (pet: Pet) => void;
    quotes: InsuranceQuote[] | null;
    isLoading: boolean;
    error: string | null;
    onFetchQuotes: () => void;
}

const InsuranceQuoteCard: React.FC<{ quote: InsuranceQuote }> = React.memo(({ quote }) => {
    const isRecommended = quote.isRecommended;

    return (
        <Card className={`flex flex-col relative overflow-hidden transition-all duration-300 ${isRecommended ? 'border-2 border-indigo-500 shadow-xl' : 'border'}`}>
            {isRecommended && (
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                    Best Match
                </div>
            )}
            <div className="flex items-center mb-4">
                <div className={`p-2 rounded-full mr-4 ${isRecommended ? 'bg-indigo-100' : 'bg-slate-100'}`}>
                    <ShieldIcon className={`h-6 w-6 ${isRecommended ? 'text-indigo-600' : 'text-slate-500'}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{quote.companyName}</h3>
            </div>
            
            {quote.recommendationReason && (
                 <p className="text-sm bg-indigo-50 text-indigo-800 p-3 rounded-lg mb-4">{quote.recommendationReason}</p>
            )}

            <div className="text-center mb-4 border-b pb-4">
                <p className="text-sm text-slate-500">Monthly Premium</p>
                <p className="text-4xl font-extrabold text-slate-800">{quote.monthlyPremium}<span className="text-xl font-semibold"> SEK</span></p>
            </div>
            
            <div className="space-y-3 text-sm flex-grow">
                <div className="flex justify-between">
                    <span className="text-slate-500">Vet Care Coverage:</span>
                    <span className="font-semibold text-slate-700">{quote.vetCareCoverage.toLocaleString('sv-SE')} SEK</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500">Deductible:</span>
                    <span className="font-semibold text-slate-700">{quote.deductible}</span>
                </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
                 <h4 className="font-semibold text-slate-600 mb-2">Key Features:</h4>
                 <ul className="space-y-1.5 list-disc list-inside text-slate-500 text-xs">
                    {quote.keyFeatures.map((feature, index) => <li key={index}>{feature}</li>)}
                 </ul>
            </div>

            <button className={`w-full mt-6 font-semibold py-2.5 rounded-lg transition-colors duration-200 ${isRecommended ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                Select Plan
            </button>
        </Card>
    );
});


export const InsurancePage: React.FC<InsurancePageProps> = ({ pets, selectedPet, onSelectPet, quotes, isLoading, error, onFetchQuotes }) => {
    
    return (
        <div className="space-y-8">
            <div className="p-6 bg-white rounded-2xl shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Pet Insurance Comparison</h1>
                        <p className="text-slate-500 mt-1">Get personalized, transparent quotes for your pet in seconds.</p>
                    </div>
                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                        <select
                            value={selectedPet?.id ?? ''}
                            onChange={(e) => {
                                const pet = pets.find(p => p.id === Number(e.target.value));
                                if (pet) onSelectPet(pet);
                            }}
                            disabled={isLoading}
                            className="w-full sm:w-48 px-4 py-2.5 rounded-lg bg-slate-100 border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {pets.map(pet => <option key={pet.id} value={pet.id}>{pet.name}</option>)}
                        </select>
                        <button
                            onClick={onFetchQuotes}
                            disabled={isLoading || !selectedPet}
                            className="bg-indigo-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm disabled:bg-indigo-300 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Generating...' : 'Get Quotes'}
                        </button>
                    </div>
                </div>
            </div>
            
            <div>
                {isLoading && (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-slate-600 font-semibold">Finding the best deals for you...</p>
                    </div>
                )}
                {error && <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg">{error}</p>}
                {quotes && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {quotes
                          .sort((a, b) => (b.isRecommended === a.isRecommended ? 0 : b.isRecommended ? 1 : -1))
                          .map((quote, index) => <InsuranceQuoteCard key={index} quote={quote} />)}
                    </div>
                )}
                {!isLoading && !quotes && !error && (
                     <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                        <ShieldIcon className="h-16 w-16 mx-auto text-slate-300" />
                        <h3 className="mt-4 text-xl font-semibold text-slate-700">Ready to find the perfect insurance?</h3>
                        <p className="mt-1 text-slate-500">Select a pet and click "Get Quotes" to start.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
