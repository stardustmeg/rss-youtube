import { SortOptionType } from '../components/sort/helper/isSortCriteria.helper';

export const BASIC_SORT_OPTION: SortOptionType = { criteria: '', direction: '' };

export const sortingCriterion = {
  DATE: 'date',
  VIEW_COUNT: 'viewCount',
} as const;

export const sortingDirection = {
  ASC: 'asc',
  DESC: 'desc',
} as const;
