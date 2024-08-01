export interface SortOptionType {
  criterion: '' | 'date' | 'viewCount';
  direction: '' | 'asc' | 'desc';
}

export const isSortOptionType = (value: unknown): value is SortOptionType => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (!('criterion' in value) || !('direction' in value)) {
    return false;
  }
  const { criterion, direction } = value;
  return (criterion === 'date' || criterion === 'viewCount') && (direction === 'asc' || direction === 'desc');
};
