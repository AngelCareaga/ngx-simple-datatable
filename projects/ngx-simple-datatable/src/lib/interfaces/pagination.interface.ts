// projects/ngx-simple-datatable/src/lib/interfaces/pagination.interface.ts
export interface PaginationData {
  totalRows: number;
  currentPage: number;
  pageSize: number;
  maxPage: number;
  startPage: number;
  endPage: number;
  stringFormat: string;
  pages: number[];
}
