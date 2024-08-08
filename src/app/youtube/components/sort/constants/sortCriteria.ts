export interface SortOptionType {
  criterion: '' | 'date' | 'viewCount';
  direction: '' | 'asc' | 'desc';
}

export interface ChipsInfo {
  count: number;
  value: SortOptionType;
}

export const chipOption = {
  dateAsc: 'dateAsc',
  dateDesc: 'dateDesc',
  viewCountAsc: 'viewCountAsc',
  viewCountDesc: 'viewCountDesc',
} as const;

export type ChipOptionType = (typeof chipOption)[keyof typeof chipOption];

export const criteriaValues = {
  dateAsc: { criterion: 'date', direction: 'asc' },
  dateDesc: { criterion: 'date', direction: 'desc' },
  viewCountAsc: { criterion: 'viewCount', direction: 'asc' },
  viewCountDesc: { criterion: 'viewCount', direction: 'desc' },
} as const;
