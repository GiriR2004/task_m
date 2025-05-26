/**
 * Formats a date string into a more readable format
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @returns Formatted date (e.g., "Jan 15, 2025")
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Determines if a due date is in the past
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @returns boolean indicating if the date is in the past
 */
export const isDatePast = (dateString: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(dateString);
  dueDate.setHours(0, 0, 0, 0);
  return dueDate < today;
};