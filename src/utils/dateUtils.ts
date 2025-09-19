/**
 * Formats an ISO date string into a user-friendly, localized date format.
 * @param dateString - The ISO date string to format.
 * @returns A formatted date string (e.g., "May 30, 2024").
 */
export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

/**
 * Checks if a given date string is today or in the future.
 * @param dateString - The ISO date string to check.
 * @returns True if the date is not in the past, false otherwise.
 */
export const isFutureDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    const today = new Date();
    // Set time to 0 to compare dates only
    today.setHours(0, 0, 0, 0); 
    return date.getTime() >= today.getTime();
};
