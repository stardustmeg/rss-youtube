export interface SortCriteria {
  criteria: string;
  direction: 'asc' | 'desc';
}

export const isSortCriteria = (value: unknown): value is SortCriteria => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (!('criteria' in value) || !('direction' in value)) {
    return false;
  }
  const { criteria, direction } = value;
  return typeof criteria === 'string' && (direction === 'asc' || direction === 'desc');
};
