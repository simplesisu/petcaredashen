import type { Pet, InsuranceQuote, InsurancePlan } from '../types';
import { insurancePlans } from '../insuranceData';

/**
 * Generates personalized insurance quotes for a given pet based on available plans.
 * @param pet - The pet object to generate quotes for.
 * @returns An array of InsuranceQuote objects, with one marked as recommended.
 */
export const generateQuotesForPet = (pet: Pet): InsuranceQuote[] => {
    const relevantPlans = insurancePlans.filter(plan => plan.applicableSpecies.includes(pet.species));

    const quotes: InsuranceQuote[] = relevantPlans.map((plan: InsurancePlan): InsuranceQuote => {
        // Simulate age-based premium increase: 5% per year over age 1
        const ageMultiplier = 1 + Math.max(0, pet.age - 1) * 0.05;
        const basePremium = pet.species === 'Dog' ? plan.basePremium.dog : plan.basePremium.cat;
        const personalizedPremium = Math.round(basePremium * ageMultiplier);

        return {
            companyName: plan.companyName,
            monthlyPremium: personalizedPremium,
            vetCareCoverage: plan.vetCareCoverage,
            deductible: plan.deductible,
            isRecommended: false,
            keyFeatures: plan.keyFeatures,
        };
    });

    // Simple recommendation algorithm: Best coverage-to-cost ratio
    if (quotes.length > 0) {
        let bestQuoteIndex = 0;
        let bestRatio = 0;

        quotes.forEach((quote, index) => {
            const ratio = quote.vetCareCoverage / quote.monthlyPremium;
            if (ratio > bestRatio) {
                bestRatio = ratio;
                bestQuoteIndex = index;
            }
        });

        quotes[bestQuoteIndex].isRecommended = true;
        quotes[bestQuoteIndex].recommendationReason = `Offers the best value with a high coverage amount of ${quotes[bestQuoteIndex].vetCareCoverage.toLocaleString('sv-SE')} SEK for its price.`;
    }

    return quotes;
};
