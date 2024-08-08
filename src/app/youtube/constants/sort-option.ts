import { SortOptionType } from '../components/sort/constants/sortCriteria';

export const BASIC_SORT_OPTION: SortOptionType = { criterion: '', direction: '' };

export const sortingCriterion = {
  DATE: 'date',
  VIEW_COUNT: 'viewCount',
} as const;

export const sortingDirection = {
  ASC: 'asc',
  DESC: 'desc',
} as const;
