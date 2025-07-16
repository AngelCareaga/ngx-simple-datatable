// projects/ngx-simple-datatable/src/lib/interfaces/column.interface.ts
export interface Column {
  isUnique?: boolean;
  field: string;
  title?: string;
  value?: any;
  condition?: FilterCondition;
  type?: ColumnType;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  preferredWidth?: string;
  strict?: boolean;
  shrinkPriority?: number;
  hide?: boolean;
  filter?: boolean;
  search?: boolean;
  sort?: boolean;
  html?: boolean;
  cellRenderer?: ((item: any) => string) | string;
  headerClass?: string;
  cellClass?: string;
}

export interface ColumnWidth {
  field: string;
  width: number;
  minWidth: number;
  maxWidth: number;
  preferredWidth: number;
  priority: number;
  shrinkPriority: number;
  isFlexible: boolean;
  isStrict: boolean;
}

export type ColumnType = 'string' | 'date' | 'number' | 'bool';

export type SortDirection = 'asc' | 'desc';

export type ColumnSizingStrategy = 'auto-fit' | 'auto-width' | 'hybrid';

export type FilterCondition =
  | ''
  | 'contain'
  | 'not_contain'
  | 'equal'
  | 'not_equal'
  | 'start_with'
  | 'end_with'
  | 'greater_than'
  | 'greater_than_equal'
  | 'less_than'
  | 'less_than_equal'
  | 'is_null'
  | 'is_not_null';
