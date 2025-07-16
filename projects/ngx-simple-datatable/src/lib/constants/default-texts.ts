// projects/ngx-simple-datatable/src/lib/constants/default-texts.ts
import { DatatableTexts } from '../interfaces/datatable-texts.interface';

export const DEFAULT_TEXTS: Required<DatatableTexts> = {
  paginationInfo: 'Showing [start] to [end] of [total] [total, plural, entry|entries]',
  itemsPerPage: 'Items per page',
  noItems: 'No [total, plural, entry|entries] found',

  filterPlaceholder: 'Filter...',
  noFilter: 'No filter',
  contains: 'Contains',
  notContains: 'Does not contain',
  equals: 'Equals',
  notEquals: 'Does not equal',
  startsWith: 'Starts with',
  endsWith: 'Ends with',
  greaterThan: 'Greater than',
  greaterThanEqual: 'Greater than or equal',
  lessThan: 'Less than',
  lessThanEqual: 'Less than or equal',
  after: 'After',
  before: 'Before',
  isEmpty: 'Is empty',
  isNotEmpty: 'Is not empty',

  booleanTrue: 'True',
  booleanFalse: 'False',
  booleanYes: 'Yes',
  booleanNo: 'No',
  booleanAll: 'All',

  noData: 'No data available',
  loading: 'Loading...',
  search: 'Search',

  sortAscending: 'Sort ascending',
  sortDescending: 'Sort descending',
  selectAll: 'Select all rows',
  selectRow: 'Select row',
  filterMenu: 'Filter menu',
};
