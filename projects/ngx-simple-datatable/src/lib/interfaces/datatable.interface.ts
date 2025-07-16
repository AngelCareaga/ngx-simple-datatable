// projects/ngx-simple-datatable/src/lib/interfaces/datatable.interface.ts
import { Column, SortDirection } from './column.interface';

export type ChangeType = 'page' | 'pagesize' | 'sort' | 'filter' | 'search' | 'reset';

export interface DatatableState {
  currentPage: number;
  pageSize: number;
  offset: number;
  sortColumn: string;
  sortDirection: SortDirection;
  search: string;
  columnFilters: Column[];
  changeType: ChangeType;
}

export interface RowClickEvent {
  item: any;
  index: number;
}
