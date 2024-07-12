export interface SortOptionType {
  criteria: '' | 'date' | 'viewCount';
  direction: '' | 'asc' | 'desc';
}

export const isSortOptionType = (value: unknown): value is SortOptionType => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (!('criteria' in value) || !('direction' in value)) {
    return false;
  }
  const { criteria, direction } = value;
  return typeof criteria === 'string' && (direction === 'asc' || direction === 'desc');
};
