import { JournalEntryResponse } from '@/boundary/interfaces/journal';

export function groupEntriesByMonth(entries: JournalEntryResponse[]) {
  return entries.reduce((grouped, entry) => {
    const date = new Date(entry.createdAt);
    const monthYearKey = `${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`;
    if (!grouped[monthYearKey]) {
      grouped[monthYearKey] = [];
    }
    grouped[monthYearKey].push(entry);
    return grouped;
  }, {} as Record<string, JournalEntryResponse[]>);
}