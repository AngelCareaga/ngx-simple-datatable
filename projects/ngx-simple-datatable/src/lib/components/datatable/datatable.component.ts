// projects/ngx-simple-datatable/src/lib/components/datatable/datatable.component.ts
import {
  afterNextRender,
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  Column,
  ColumnType,
  ColumnWidth,
  FilterCondition,
  SortDirection,
  ColumnSizingStrategy,
} from '../../interfaces/column.interface';
import { DatatableState, RowClickEvent } from '../../interfaces/datatable.interface';
import { PaginationData } from '../../interfaces/pagination.interface';
import { DatatableTexts } from '../../interfaces/datatable-texts.interface';
import { SlotDirective } from '../../directives/slot.directive';
import { ColumnHeaderComponent } from '../column-header/column-header.component';
import { LoaderIconComponent } from '../icons/loader-icon.component';
import { CheckIconComponent } from '../icons/check-icon.component';
import { DEFAULT_TEXTS } from '../../constants/default-texts';
import { interpolateWithPlural } from '../../utils/text-utils';

@Component({
  selector: 'ngx-simple-datatable',
  standalone: true,
  template: `
    <div class="ngx-sdt-datatable" [class]="tableClass()">
      <div
        #tableContainer
        class="ngx-sdt-table-container"
        [class.ngx-sdt-table-container--min-height]="loading()"
        [class.ngx-sdt-table-container--scroll]="shouldShowHorizontalScroll()"
        [style.height]="stickyHeader() ? height() : null"
      >
        <table
          #dataTable
          class="ngx-sdt-table"
          [class]="skin()"
          [style.table-layout]="'fixed'"
          [style.width]="getTableWidth()"
          [style.min-width]="getTableMinWidth()"
        >
          <colgroup>
            @if (hasCheckbox()) {
              <col [style.width.px]="checkboxColumnWidth" />
            }
            @for (width of finalColumnWidths(); track width.field) {
              <col [style.width.px]="width.width" />
            }
          </colgroup>

          <thead class="ngx-sdt-table__header" [class.ngx-sdt-table__header--sticky]="stickyHeader()">
            <ngx-simple-datatable-column-header
              [columns]="columns()"
              [hasCheckbox]="hasCheckbox()"
              [stickyHeader]="stickyHeader()"
              [stickyFirstColumn]="stickyFirstColumn()"
              [sortable]="sortable()"
              [sortColumn]="currentSortColumn()"
              [sortDirection]="currentSortDirection()"
              [columnFilter]="columnFilter()"
              [selectedAll]="selectedAll()"
              [isFooter]="false"
              [columnWidths]="finalColumnWidths()"
              [checkboxColumnWidth]="checkboxColumnWidth"
              [filterInputClass]="getFilterInputClass()"
              [filterButtonClass]="getFilterButtonClass()"
              [texts]="finalTexts()"
              (selectAll)="onSelectAll($event)"
              (sortChange)="onSortChange($event)"
              (filterChange)="onFilterChange()"
            />
          </thead>

          <tbody>
            @if (displayedRows().length > 0) {
              @for (item of displayedRows(); track trackByFn($index, item)) {
                <tr
                  class="ngx-sdt-table__row"
                  [class]="getRowClass(item, $index)"
                  [class.ngx-sdt-table__row--clickable]="selectRowOnClick()"
                  [attr.aria-label]="getRowAriaLabel($index)"
                  (click)="onRowClick(item, $index)"
                  (dblclick)="onRowDoubleClick(item)"
                >
                  @if (hasCheckbox()) {
                    <td
                      class="ngx-sdt-table__cell"
                      [class.ngx-sdt-table__cell--sticky]="stickyFirstColumn()"
                      [style.width.px]="checkboxColumnWidth"
                      [style.min-width.px]="checkboxColumnWidth"
                      [style.max-width.px]="checkboxColumnWidth"
                    >
                      <div class="ngx-sdt-checkbox__container" (click)="$event.stopPropagation()">
                        <input
                          type="checkbox"
                          class="ngx-sdt-checkbox__input"
                          [value]="getUniqueValue(item, $index)"
                          [attr.aria-label]="finalTexts().selectRow"
                          [(ngModel)]="item.selected"
                          (change)="onCheckboxChange()"
                        />
                        <div class="ngx-sdt-checkbox__visual">
                          <ngx-check-icon class="ngx-sdt-checkbox__check-icon" />
                        </div>
                      </div>
                    </td>
                  }

                  @for (col of visibleColumns(); track col.field; let j = $index) {
                    <td
                      class="ngx-sdt-table__cell"
                      [class]="getCellClass(item, col, j)"
                      [style.width.px]="getColumnWidth(col.field)"
                      [style.min-width.px]="getColumnWidth(col.field)"
                      [style.max-width.px]="getColumnWidth(col.field)"
                    >
                      <div class="ngx-sdt-table__cell-content">
                        @if (hasSlot(col.field)) {
                          <ng-container
                            [ngTemplateOutlet]="getSlot(col.field)!"
                            [ngTemplateOutletContext]="{ data: item }"
                          />
                        } @else if (col.cellRenderer) {
                          <div [innerHTML]="sanitizeHtml(renderCell(col, item))"></div>
                        } @else {
                          <span [class]="getCellTypeClass(col.type)">
                            {{ formatCellValue(item, col) }}
                          </span>
                        }
                      </div>
                    </td>
                  }
                </tr>
              }
            } @else if (!loading()) {
              <tr class="ngx-sdt-table__row">
                <td class="ngx-sdt-table__cell ngx-sdt-table__cell--no-data" [attr.colspan]="totalColumnCount()">
                  <div class="ngx-sdt-table__cell-content">{{ finalTexts().noData }}</div>
                </td>
              </tr>
            }

            @if (loading() && displayedRows().length === 0) {
              @for (k of loadingRange(); track k) {
                <tr class="ngx-sdt-table__row ngx-sdt-table__row--loading">
                  <td class="ngx-sdt-table__cell ngx-sdt-table__cell--skeleton" [attr.colspan]="totalColumnCount()">
                    <div class="ngx-sdt-skeleton-box"></div>
                  </td>
                </tr>
              }
            }
          </tbody>

          @if (cloneHeaderInFooter()) {
            <tfoot class="ngx-sdt-table__footer" [class.ngx-sdt-table__footer--sticky]="stickyHeader()">
              <ngx-simple-datatable-column-header
                [columns]="columns()"
                [hasCheckbox]="hasCheckbox()"
                [stickyHeader]="stickyHeader()"
                [stickyFirstColumn]="stickyFirstColumn()"
                [sortable]="sortable()"
                [sortColumn]="currentSortColumn()"
                [sortDirection]="currentSortDirection()"
                [columnFilter]="columnFilter()"
                [selectedAll]="selectedAll()"
                [isFooter]="true"
                [columnWidths]="finalColumnWidths()"
                [checkboxColumnWidth]="checkboxColumnWidth"
                [filterInputClass]="getFilterInputClass()"
                [filterButtonClass]="getFilterButtonClass()"
                [texts]="finalTexts()"
                (selectAll)="onSelectAll($event)"
                (sortChange)="onSortChange($event)"
                (filterChange)="onFilterChange()"
              />
            </tfoot>
          }
        </table>

        @if (displayedRows().length > 0 && loading()) {
          <div class="ngx-sdt-loading-overlay">
            <ngx-loader-icon />
          </div>
        }
      </div>

      @if (pagination() && paginationData().totalRows > 0) {
        <div class="ngx-sdt-pagination">
          <div class="ngx-sdt-pagination__info">
            <span class="ngx-sdt-pagination__info-text">{{ getPaginationText() }}</span>
            @if (showPageSize()) {
              <select
                [(ngModel)]="currentPageSize"
                class="ngx-sdt-pagination__page-size-select"
                (ngModelChange)="onPageSizeChange()"
              >
                @for (option of pageSizeOptions(); track option) {
                  <option [value]="option">{{ option }}</option>
                }
              </select>
            }
          </div>

          <div class="ngx-sdt-pagination__controls">
            @if (showFirstPage()) {
              <button
                type="button"
                class="ngx-sdt-pagination__button"
                [class.ngx-sdt-button--disabled]="currentPage() <= 1"
                (click)="goToPage(1)"
              >
                @if (firstArrow()) {
                  <span [innerHTML]="sanitizeHtml(firstArrow())"></span>
                } @else {
                  <svg class="ngx-sdt-pagination__arrow-icon" viewBox="0 0 16 16">
                    <path
                      d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                    <path
                      d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                }
              </button>
            }

            <button
              type="button"
              class="ngx-sdt-pagination__button"
              [class.ngx-sdt-button--disabled]="currentPage() <= 1"
              (click)="goToPage(currentPage() - 1)"
            >
              @if (previousArrow()) {
                <span [innerHTML]="sanitizeHtml(previousArrow())"></span>
              } @else {
                <svg class="ngx-sdt-pagination__arrow-icon" viewBox="0 0 16 16">
                  <path
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                  />
                </svg>
              }
            </button>

            @if (showNumbers()) {
              @for (page of paginationData().pages; track page) {
                <button
                  type="button"
                  class="ngx-sdt-pagination__button ngx-sdt-pagination__button--number"
                  [class.ngx-sdt-pagination__button--active]="page === currentPage()"
                  (click)="goToPage(page)"
                >
                  {{ page }}
                </button>
              }
            }

            <button
              type="button"
              class="ngx-sdt-pagination__button"
              [class.ngx-sdt-button--disabled]="currentPage() >= paginationData().maxPage"
              (click)="goToPage(currentPage() + 1)"
            >
              @if (nextArrow()) {
                <span [innerHTML]="sanitizeHtml(nextArrow())"></span>
              } @else {
                <svg class="ngx-sdt-pagination__arrow-icon" viewBox="0 0 16 16">
                  <path
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8L4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              }
            </button>

            @if (showLastPage()) {
              <button
                type="button"
                class="ngx-sdt-pagination__button"
                [class.ngx-sdt-button--disabled]="currentPage() >= paginationData().maxPage"
                (click)="goToPage(paginationData().maxPage)"
              >
                @if (lastArrow()) {
                  <span [innerHTML]="sanitizeHtml(lastArrow())"></span>
                } @else {
                  <svg class="ngx-sdt-pagination__arrow-icon" viewBox="0 0 16 16">
                    <path
                      d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8L3.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                    <path
                      d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8L7.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                }
              </button>
            }
          </div>
        </div>
      }
    </div>
  `,
  imports: [CommonModule, FormsModule, ColumnHeaderComponent, LoaderIconComponent, CheckIconComponent],
})
export class SimpleDatatableComponent {
  loading = input(false);
  isServerMode = input(false);
  skin = input('ngx-sdt-table--striped ngx-sdt-table--hover');
  totalRows = input(0);
  rows = input.required<any[]>();
  columns = input.required<Column[]>();
  hasCheckbox = input(false);
  search = input('');
  page = input(1);
  pageSize = input(10);
  pageSizeOptions = input([10, 20, 30, 50, 100]);
  showPageSize = input(true);
  rowClass = input<string | ((item: any) => string)>('');
  cellClass = input<string | ((item: any) => string)>('');
  sortable = input(true);
  sortColumn = input('id');
  sortDirection = input<SortDirection>('asc');
  columnFilter = input(false);
  filterDebounceTime = input(300);
  pagination = input(true);
  showNumbers = input(true);
  showNumbersCount = input(5);
  showFirstPage = input(true);
  showLastPage = input(true);
  firstArrow = input('');
  lastArrow = input('');
  nextArrow = input('');
  previousArrow = input('');
  stickyHeader = input(false);
  height = input('500px');
  stickyFirstColumn = input(false);
  cloneHeaderInFooter = input(false);
  selectRowOnClick = input(false);
  tableClass = input('');
  autoCalculateWidths = input(true);
  expandToFillContainer = input(true);
  columnSizingStrategy = input<ColumnSizingStrategy>('auto-fit');
  respectColumnMinWidths = input(false);
  allowHorizontalScroll = input(true);
  minTableWidth = input('');
  preserveReadability = input(true);

  texts = input<Partial<DatatableTexts>>({});
  paginationInfo = input<string | null>(null);
  noDataContent = input<string | null>(null);
  filterPlaceholder = input<string | null>(null);
  booleanTrueText = input<string | null>(null);
  booleanFalseText = input<string | null>(null);
  booleanYesText = input<string | null>(null);
  booleanNoText = input<string | null>(null);
  booleanAllText = input<string | null>(null);

  changeServer = output<DatatableState>();
  sortChange = output<{ field: string; direction: SortDirection }>();
  searchChange = output<string>();
  pageChange = output<number>();
  pageSizeChange = output<number>();
  rowSelect = output<any[]>();
  filterChange = output<Column[]>();
  rowClick = output<RowClickEvent>();
  rowDoubleClick = output<any>();

  currentPage = signal(1);
  currentPageSize = signal(10);
  currentSortColumn = signal('id');
  currentSortDirection = signal<SortDirection>('asc');
  currentSearch = signal('');
  selectedAll = signal<boolean | null>(null);
  uniqueKey = signal('');
  columnWidths = signal<ColumnWidth[]>([]);
  containerWidth = signal(0);
  currentBreakpoint = signal<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('xl');
  tableInitialized = signal(false);
  filterChangeTrigger = signal(0);

  @ViewChild('dataTable') dataTable!: ElementRef<HTMLTableElement>;
  @ViewChild('tableContainer') tableContainer!: ElementRef<HTMLDivElement>;

  readonly checkboxColumnWidth = 52;
  readonly paddingOffset = 32;
  readonly scrollbarWidth = 16;
  readonly borderWidth = 2;
  readonly breakpoints = {
    xs: 480,
    sm: 768,
    md: 1024,
    lg: 1280,
    xl: 1536,
  };

  private resizeObserver?: ResizeObserver;
  private recalculateTimeout?: number;
  private filterDebounceTimeout?: number;
  private searchDebounceTimeout?: number;

  finalTexts = computed(() => {
    const baseTexts = { ...DEFAULT_TEXTS };
    const customTexts = this.texts();

    return {
      ...baseTexts,
      ...customTexts,
      ...(this.paginationInfo() && { paginationInfo: this.paginationInfo()! }),
      ...(this.noDataContent() && { noData: this.noDataContent()! }),
      ...(this.filterPlaceholder() && { filterPlaceholder: this.filterPlaceholder()! }),
      ...(this.booleanTrueText() && { booleanTrue: this.booleanTrueText()! }),
      ...(this.booleanFalseText() && { booleanFalse: this.booleanFalseText()! }),
      ...(this.booleanYesText() && { booleanYes: this.booleanYesText()! }),
      ...(this.booleanNoText() && { booleanNo: this.booleanNoText()! }),
      ...(this.booleanAllText() && { booleanAll: this.booleanAllText()! }),
    } as Required<DatatableTexts>;
  });

  visibleColumns = computed(() => this.columns().filter(col => !col.hide));

  totalColumnCount = computed(() => this.visibleColumns().length + (this.hasCheckbox() ? 1 : 0));

  finalColumnWidths = computed(() => {
    if (!this.autoCalculateWidths() || this.columnWidths().length === 0) {
      return this.visibleColumns().map(col => ({
        field: col.field,
        width: this.parseWidth(col.width) || this.getResponsiveBaseWidth(col.type || 'string'),
        minWidth: this.parseWidth(col.minWidth) || this.getResponsiveMinWidth(col.type || 'string'),
        maxWidth: this.parseWidth(col.maxWidth) || this.getResponsiveMaxWidth(col.type || 'string'),
        preferredWidth: this.parseWidth(col.preferredWidth) || this.getResponsiveBaseWidth(col.type || 'string'),
        priority: 1,
        shrinkPriority: col.shrinkPriority || 5,
        isFlexible: true,
        isStrict: col.strict || false,
      }));
    }
    return this.columnWidths();
  });

  totalTableWidth = computed(() => {
    const columnsWidth = this.finalColumnWidths().reduce((sum, col) => sum + col.width, 0);
    const checkboxWidth = this.hasCheckbox() ? this.checkboxColumnWidth : 0;
    return columnsWidth + checkboxWidth;
  });

  shouldShowHorizontalScroll = computed(() => {
    if (!this.allowHorizontalScroll()) return false;

    const strategy = this.columnSizingStrategy();
    if (strategy === 'auto-fit') return false;

    const totalWidth = this.totalTableWidth();
    const containerWidth = this.containerWidth();

    return totalWidth > containerWidth;
  });

  filteredRows = computed(() => {
    this.filterChangeTrigger();
    let rows = this.rows();

    if (this.isServerMode()) {
      return rows;
    }

    this.columns().forEach(col => {
      if (col.filter && this.hasFilterValue(col)) {
        rows = this.applyColumnFilter(rows, col);
      }
    });

    if (this.currentSearch()) {
      rows = this.applyGlobalSearch(rows);
    }

    return rows;
  });

  sortedRows = computed(() => {
    const rows = this.filteredRows();
    if (this.isServerMode() || !this.currentSortColumn()) {
      return rows;
    }

    return this.sortRows(rows);
  });

  displayedRows = computed(() => {
    const rows = this.sortedRows();
    if (!this.pagination() || this.isServerMode()) {
      return rows;
    }

    const start = (this.currentPage() - 1) * this.currentPageSize();
    const end = start + this.currentPageSize();

    return rows.slice(start, end);
  });

  paginationData = computed((): PaginationData => {
    const totalRows = this.isServerMode() ? this.totalRows() : this.filteredRows().length;
    const maxPage = Math.max(Math.ceil(totalRows / this.currentPageSize()), 1);
    let startPage = 1;
    let endPage = maxPage;

    if (this.showNumbersCount() < maxPage) {
      startPage = Math.max(this.currentPage() - Math.floor(this.showNumbersCount() / 2), 1);
      endPage = startPage + this.showNumbersCount() - 1;

      if (endPage > maxPage) {
        endPage = maxPage;
        startPage = endPage - this.showNumbersCount() + 1;
      }
    }

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    const offset = (this.currentPage() - 1) * this.currentPageSize() + 1;
    const limit = Math.min(this.currentPage() * this.currentPageSize(), totalRows);

    return {
      totalRows,
      currentPage: this.currentPage(),
      pageSize: this.currentPageSize(),
      maxPage,
      startPage,
      endPage,
      stringFormat: '',
      pages,
    };
  });

  loadingRange = computed(() => Array.from({ length: this.currentPageSize() }, (_, i) => i));

  slots = contentChildren(SlotDirective);
  private slotsMap = new Map<string, TemplateRef<any>>();

  constructor(private sanitizer: DomSanitizer) {
    effect(() => {
      this.currentPage.set(this.page());
      this.currentPageSize.set(this.pageSize());
      this.currentSortColumn.set(this.sortColumn());
      this.currentSortDirection.set(this.sortDirection());

      const newSearch = this.search();
      if (newSearch !== this.currentSearch()) {
        this.handleSearchChange(newSearch);
      }
    });

    effect(() => {
      const uniqueCol = this.columns().find(col => col.isUnique);
      this.uniqueKey.set(uniqueCol?.field || '');
    });

    effect(() => {
      this.columns().forEach(col => {
        col.type = (col.type?.toLowerCase() as ColumnType) || 'string';
        col.isUnique = col.isUnique ?? false;
        col.hide = col.hide ?? false;
        col.filter = col.filter ?? true;
        col.search = col.search ?? true;
        col.sort = col.sort ?? true;
        col.html = col.html ?? false;
        col.strict = col.strict ?? false;
        col.shrinkPriority = col.shrinkPriority ?? 5;
        col.condition = col.condition || (col.type === 'string' ? 'contain' : 'equal');
        if (col.value === undefined) {
          col.value = '';
        }
      });
    });

    effect(() => {
      if (this.autoCalculateWidths() && this.rows().length > 0 && this.tableInitialized()) {
        this.scheduleWidthCalculation();
      }
    });

    effect(() => {
      if (this.containerWidth() > 0 && this.autoCalculateWidths() && this.tableInitialized()) {
        this.scheduleWidthCalculation();
      }
    });

    afterNextRender(() => {
      this.updateSlotsMap();
      this.initializeTable();
    });
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.recalculateTimeout) {
      clearTimeout(this.recalculateTimeout);
    }
    if (this.filterDebounceTimeout) {
      clearTimeout(this.filterDebounceTimeout);
    }
    if (this.searchDebounceTimeout) {
      clearTimeout(this.searchDebounceTimeout);
    }
  }

  getPaginationText(): string {
    const texts = this.finalTexts();
    const pagination = this.paginationData();
    const start = pagination.totalRows ? (pagination.currentPage - 1) * pagination.pageSize + 1 : 0;
    const end = Math.min(pagination.currentPage * pagination.pageSize, pagination.totalRows);

    return interpolateWithPlural(texts.paginationInfo, {
      start,
      end,
      total: pagination.totalRows,
    });
  }

  getTableWidth(): string {
    const strategy = this.columnSizingStrategy();

    if (!this.expandToFillContainer() || strategy === 'auto-width') {
      return this.totalTableWidth() + 'px';
    }

    if (strategy === 'hybrid') {
      const totalWidth = this.totalTableWidth();
      const containerWidth = this.containerWidth();
      return totalWidth > containerWidth ? totalWidth + 'px' : '100%';
    }

    return '100%';
  }

  getTableMinWidth(): string {
    const minWidth = this.minTableWidth();
    if (minWidth) return minWidth;

    if (this.respectColumnMinWidths() || this.preserveReadability()) {
      const minColumnsWidth = this.finalColumnWidths().reduce((sum, col) => sum + col.minWidth, 0);
      const checkboxWidth = this.hasCheckbox() ? this.checkboxColumnWidth : 0;
      return minColumnsWidth + checkboxWidth + 'px';
    }

    return '100%';
  }

  getColumnWidth(field: string): number {
    const columnWidth = this.finalColumnWidths().find(col => col.field === field);
    return columnWidth ? columnWidth.width : this.getResponsiveBaseWidth('string');
  }

  getFilterInputClass(): string {
    const breakpoint = this.currentBreakpoint();
    const classes = ['ngx-sdt-header__filter-input--responsive'];
    switch (breakpoint) {
      case 'xs':
        classes.push('ngx-sdt-header__filter-input--xs');
        break;
      case 'sm':
        classes.push('ngx-sdt-header__filter-input--sm');
        break;
      case 'md':
        classes.push('ngx-sdt-header__filter-input--md');
        break;
      default:
        classes.push('ngx-sdt-header__filter-input--lg');
        break;
    }
    return classes.join(' ');
  }

  getFilterButtonClass(): string {
    const breakpoint = this.currentBreakpoint();
    const classes = ['ngx-sdt-header__filter-button--responsive'];
    switch (breakpoint) {
      case 'xs':
        classes.push('ngx-sdt-header__filter-button--xs');
        break;
      case 'sm':
        classes.push('ngx-sdt-header__filter-button--sm');
        break;
      case 'md':
        classes.push('ngx-sdt-header__filter-button--md');
        break;
      default:
        classes.push('ngx-sdt-header__filter-button--lg');
        break;
    }
    return classes.join(' ');
  }

  getRowAriaLabel(index: number): string {
    return `${this.finalTexts().selectRow} ${index + 1}`;
  }

  private updateBreakpoint(): void {
    const width = this.containerWidth();
    if (width <= this.breakpoints.xs) {
      this.currentBreakpoint.set('xs');
    } else if (width <= this.breakpoints.sm) {
      this.currentBreakpoint.set('sm');
    } else if (width <= this.breakpoints.md) {
      this.currentBreakpoint.set('md');
    } else if (width <= this.breakpoints.lg) {
      this.currentBreakpoint.set('lg');
    } else {
      this.currentBreakpoint.set('xl');
    }
  }

  private getResponsiveBaseWidth(type: ColumnType): number {
    const breakpoint = this.currentBreakpoint();
    const widths = {
      bool: { xs: 60, sm: 70, md: 80, lg: 90, xl: 100 },
      number: { xs: 80, sm: 90, md: 100, lg: 110, xl: 120 },
      date: { xs: 100, sm: 110, md: 120, lg: 130, xl: 140 },
      string: { xs: 100, sm: 120, md: 140, lg: 160, xl: 180 },
    };
    return widths[type][breakpoint];
  }

  private getResponsiveMinWidth(type: ColumnType): number {
    const breakpoint = this.currentBreakpoint();
    const baseMinWidths = {
      bool: { xs: 50, sm: 60, md: 70, lg: 70, xl: 70 },
      number: { xs: 60, sm: 70, md: 80, lg: 80, xl: 80 },
      date: { xs: 80, sm: 90, md: 100, lg: 100, xl: 100 },
      string: { xs: 80, sm: 90, md: 100, lg: 100, xl: 100 },
    };

    let minWidth = baseMinWidths[type][breakpoint];

    if (this.preserveReadability()) {
      const readabilityMinWidths = {
        bool: 80,
        number: 100,
        date: 120,
        string: 120,
      };
      minWidth = Math.max(minWidth, readabilityMinWidths[type]);
    }

    return minWidth;
  }

  private getResponsiveMaxWidth(type: ColumnType): number {
    const breakpoint = this.currentBreakpoint();
    const containerWidth = this.containerWidth();
    const maxPercentages = {
      bool: 0.1,
      number: 0.15,
      date: 0.2,
      string: 0.4,
    };

    const absoluteMaxWidths = {
      bool: { xs: 80, sm: 100, md: 120, lg: 140, xl: 160 },
      number: { xs: 120, sm: 150, md: 180, lg: 200, xl: 220 },
      date: { xs: 140, sm: 160, md: 180, lg: 200, xl: 220 },
      string: { xs: 200, sm: 250, md: 300, lg: 350, xl: 400 },
    };

    const percentageMax = containerWidth * maxPercentages[type];
    const absoluteMax = absoluteMaxWidths[type][breakpoint];

    return Math.min(percentageMax, absoluteMax);
  }

  private initializeTable(): void {
    if (this.tableContainer?.nativeElement) {
      this.tableInitialized.set(true);
      this.updateContainerWidth();
      this.resizeObserver = new ResizeObserver(() => {
        this.updateContainerWidth();
      });
      this.resizeObserver.observe(this.tableContainer.nativeElement);
    }
  }

  private updateContainerWidth(): void {
    if (this.tableContainer?.nativeElement) {
      const width = this.tableContainer.nativeElement.clientWidth;
      this.containerWidth.set(width);
      this.updateBreakpoint();
    }
  }

  private scheduleWidthCalculation(): void {
    if (this.recalculateTimeout) {
      clearTimeout(this.recalculateTimeout);
    }
    this.recalculateTimeout = setTimeout(() => {
      this.calculateColumnWidths();
    }, 100);
  }

  private calculateColumnWidths(): void {
    if (!this.tableInitialized() || this.containerWidth() === 0) {
      return;
    }

    const visibleCols = this.visibleColumns();
    if (visibleCols.length === 0) {
      return;
    }

    const availableWidth = this.getAvailableWidth();
    const sampleRows = this.rows().slice(0, Math.min(15, this.rows().length));

    const initialWidths: ColumnWidth[] = visibleCols.map(col => {
      const headerText = col.title || col.field;
      const headerWidth =
        this.measureTextWidth(headerText, this.getResponsiveFontWeight(), this.getResponsiveFontSize()) + 80;

      let maxContentWidth = headerWidth;
      let avgContentWidth = headerWidth;
      let totalContentWidth = headerWidth;

      if (sampleRows.length > 0) {
        const contentWidths = sampleRows.map(row => {
          const value = this.formatCellValue(row, col);
          return this.measureTextWidth(value.toString(), '400', this.getResponsiveFontSize()) + this.paddingOffset;
        });

        maxContentWidth = Math.max(headerWidth, ...contentWidths);
        totalContentWidth = headerWidth + contentWidths.reduce((sum, w) => sum + w, 0);
        avgContentWidth = totalContentWidth / (contentWidths.length + 1);
      }

      const baseWidth = this.getResponsiveBaseWidth(col.type || 'string');
      const minWidth = this.parseWidth(col.minWidth) || this.getResponsiveMinWidth(col.type || 'string');
      const maxWidth = this.parseWidth(col.maxWidth) || this.getResponsiveMaxWidth(col.type || 'string');
      const preferredWidth = this.parseWidth(col.preferredWidth) || baseWidth;

      const idealWidth = Math.max(
        minWidth,
        Math.min(maxWidth, Math.max(preferredWidth, Math.ceil(Math.max(headerWidth, avgContentWidth))))
      );

      return {
        field: col.field,
        width: idealWidth,
        minWidth: minWidth,
        maxWidth: maxWidth,
        preferredWidth: preferredWidth,
        priority: this.getColumnPriority(col),
        shrinkPriority: col.shrinkPriority || 5,
        isFlexible: !col.width && !col.strict,
        isStrict: col.strict || false,
      };
    });

    this.redistributeWidths(initialWidths, availableWidth);
    this.columnWidths.set(initialWidths);
  }

  private getResponsiveFontSize(): string {
    const breakpoint = this.currentBreakpoint();
    const fontSizes = {
      xs: '11px',
      sm: '12px',
      md: '13px',
      lg: '14px',
      xl: '14px',
    };
    return fontSizes[breakpoint];
  }

  private getResponsiveFontWeight(): string {
    return '600';
  }

  private redistributeWidths(widths: ColumnWidth[], availableWidth: number): void {
    const strategy = this.columnSizingStrategy();
    const totalCurrentWidth = widths.reduce((sum, w) => sum + w.width, 0);
    const totalMinWidth = widths.reduce((sum, w) => sum + w.minWidth, 0);
    const strictColumns = widths.filter(w => w.isStrict);
    const flexibleColumns = widths.filter(w => w.isFlexible && !w.isStrict);

    if (strategy === 'auto-width' || (this.respectColumnMinWidths() && totalMinWidth > availableWidth)) {
      widths.forEach(w => {
        w.width = Math.max(w.minWidth, w.preferredWidth);
      });
      return;
    }

    if (strategy === 'hybrid') {
      const strictWidth = strictColumns.reduce((sum, w) => sum + w.preferredWidth, 0);
      const remainingWidth = Math.max(0, availableWidth - strictWidth);
      const flexibleMinWidth = flexibleColumns.reduce((sum, w) => sum + w.minWidth, 0);

      if (flexibleMinWidth > remainingWidth) {
        widths.forEach(w => {
          if (w.isStrict) {
            w.width = w.preferredWidth;
          } else {
            const proportion = w.minWidth / flexibleMinWidth;
            w.width = Math.max(w.minWidth, Math.floor(remainingWidth * proportion));
          }
        });
        return;
      }
    }

    if (totalCurrentWidth < availableWidth && strategy === 'auto-fit') {
      const extraSpace = availableWidth - totalCurrentWidth;

      if (flexibleColumns.length > 0) {
        const spacePerColumn = extraSpace / flexibleColumns.length;
        flexibleColumns.forEach(w => {
          const maxIncrease = w.maxWidth - w.width;
          const increase = Math.min(spacePerColumn, maxIncrease);
          w.width += Math.floor(increase);
        });

        const remainingSpace = availableWidth - widths.reduce((sum, w) => sum + w.width, 0);
        if (remainingSpace > 0 && flexibleColumns.length > 0) {
          const totalFlexibleWidth = flexibleColumns.reduce((sum, w) => sum + w.width, 0);
          flexibleColumns.forEach(w => {
            const proportion = w.width / totalFlexibleWidth;
            w.width += Math.floor(remainingSpace * proportion);
          });
        }
      } else {
        const spacePerColumn = Math.floor(extraSpace / widths.length);
        widths.forEach(w => {
          w.width += spacePerColumn;
        });
      }
      return;
    }

    if (totalCurrentWidth > availableWidth && strategy === 'auto-fit') {
      if (this.respectColumnMinWidths() && totalMinWidth > availableWidth) {
        const scaleFactor = availableWidth / totalMinWidth;
        widths.forEach(w => {
          w.width = Math.floor(w.minWidth * scaleFactor);
        });
        return;
      }

      const excessWidth = totalCurrentWidth - availableWidth;
      const reducibleColumns = flexibleColumns.filter(w => w.width > w.minWidth);

      if (reducibleColumns.length > 0) {
        reducibleColumns.sort((a, b) => a.shrinkPriority - b.shrinkPriority);

        let remainingExcess = excessWidth;
        for (const col of reducibleColumns) {
          const maxReduction = col.width - col.minWidth;
          const reduction = Math.min(remainingExcess, maxReduction);
          col.width -= Math.floor(reduction);
          remainingExcess -= reduction;

          if (remainingExcess <= 0) break;
        }

        if (remainingExcess > 0 && !this.respectColumnMinWidths()) {
          const totalReducible = widths.reduce((sum, w) => sum + (w.width - w.minWidth), 0);
          if (totalReducible > 0) {
            const scaleFactor = Math.max(0, (totalCurrentWidth - remainingExcess) / totalCurrentWidth);
            widths.forEach(w => {
              const newWidth = w.width * scaleFactor;
              w.width = Math.max(w.minWidth, Math.floor(newWidth));
            });
          }
        }
      }
    }

    const finalTotal = widths.reduce((sum, w) => sum + w.width, 0);
    const remainder = availableWidth - finalTotal;

    if (remainder > 0 && remainder < 20 && strategy === 'auto-fit') {
      const expandableColumns = flexibleColumns.filter(w => w.width < w.maxWidth);
      if (expandableColumns.length > 0) {
        const extraPerColumn = Math.floor(remainder / expandableColumns.length);
        expandableColumns.forEach(w => {
          w.width = Math.min(w.maxWidth, w.width + extraPerColumn);
        });
      }
    }
  }

  private measureTextWidth(text: string, fontWeight: string, fontSize: string): number {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    context.font = `${fontWeight} ${fontSize} Arial`;
    return Math.ceil(context.measureText(text).width);
  }

  private getAvailableWidth(): number {
    const containerWidth = this.containerWidth();
    const checkboxWidth = this.hasCheckbox() ? this.checkboxColumnWidth : 0;
    const availableWidth = containerWidth - checkboxWidth - 32;

    return Math.max(availableWidth, 300);
  }

  private getColumnPriority(col: Column): number {
    if (col.isUnique) return 1;
    if (col.type === 'string') return 2;
    if (col.type === 'number') return 3;
    if (col.type === 'date') return 4;
    if (col.type === 'bool') return 5;
    return 6;
  }

  private parseWidth(width?: string): number | null {
    if (!width) return null;
    const match = width.match(/^(\d+)px?$/);
    return match ? parseInt(match[1]) : null;
  }

  private updateSlotsMap(): void {
    this.slotsMap.clear();
    this.slots().forEach(slot => {
      if (slot.fieldName()) {
        this.slotsMap.set(slot.fieldName(), slot.templateRef);
      }
    });
  }

  private handleSearchChange(newSearch: string): void {
    if (this.isServerMode() && this.filterDebounceTime() > 0) {
      if (this.searchDebounceTimeout) {
        clearTimeout(this.searchDebounceTimeout);
      }
      this.searchDebounceTimeout = setTimeout(() => {
        this.currentSearch.set(newSearch);
        this.currentPage.set(1);
        this.emitServerChange('search', true);
      }, this.filterDebounceTime());
    } else {
      this.currentSearch.set(newSearch);
      if (this.isServerMode()) {
        this.currentPage.set(1);
        this.emitServerChange('search', true);
      }
    }
  }

  hasSlot(fieldName: string): boolean {
    return this.slotsMap.has(fieldName);
  }

  getSlot(fieldName: string): TemplateRef<any> | null {
    return this.slotsMap.get(fieldName) || null;
  }

  onSelectAll(checked: boolean): void {
    this.displayedRows().forEach(row => (row.selected = checked));
    this.updateSelectedAll();
    this.rowSelect.emit(this.getSelectedRows());
  }

  onSortChange(field: string): void {
    let direction: SortDirection = 'asc';
    if (field === this.currentSortColumn()) {
      direction = this.currentSortDirection() === 'asc' ? 'desc' : 'asc';
    }

    this.currentSortColumn.set(field);
    this.currentSortDirection.set(direction);

    if (this.isServerMode()) {
      this.emitServerChange('sort');
    } else {
      this.sortChange.emit({ field, direction });
    }
  }

  onFilterChange(): void {
    this.currentPage.set(1);

    if (this.isServerMode()) {
      if (this.filterDebounceTime() > 0) {
        if (this.filterDebounceTimeout) {
          clearTimeout(this.filterDebounceTimeout);
        }
        this.filterDebounceTimeout = setTimeout(() => {
          this.emitServerChange('filter', true);
        }, this.filterDebounceTime());
      } else {
        this.emitServerChange('filter', true);
      }
    } else {
      this.filterChangeTrigger.update(val => val + 1);
      this.filterChange.emit(this.columns());
    }
  }

  onCheckboxChange(): void {
    this.updateSelectedAll();
    this.rowSelect.emit(this.getSelectedRows());
  }

  onRowClick(item: any, index: number): void {
    if (this.selectRowOnClick()) {
      item.selected = !item.selected;
      this.onCheckboxChange();
    }
    this.rowClick.emit({ item, index });
  }

  onRowDoubleClick(item: any): void {
    this.rowDoubleClick.emit(item);
  }

  onPageSizeChange(): void {
    this.currentPage.set(1);
    if (this.isServerMode()) {
      this.emitServerChange('pagesize', true);
    } else {
      this.pageSizeChange.emit(this.currentPageSize());
    }
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.paginationData().maxPage || this.loading()) {
      return;
    }
    this.currentPage.set(page);

    if (this.isServerMode()) {
      this.emitServerChange('page');
    } else {
      this.pageChange.emit(page);
    }
  }

  private hasFilterValue(col: Column): boolean {
    return (
      (col.value !== undefined && col.value !== null && col.value !== '') ||
      col.condition === 'is_null' ||
      col.condition === 'is_not_null'
    );
  }

  private applyColumnFilter(rows: any[], col: Column): any[] {
    return rows.filter(item => {
      const cellValue = this.getCellValue(item, col.field);
      return this.matchesFilter(cellValue, col);
    });
  }

  private applyGlobalSearch(rows: any[]): any[] {
    const searchTerm = this.currentSearch().toLowerCase();
    const searchableColumns = this.columns().filter(col => col.search && !col.hide);

    return rows.filter(row =>
      searchableColumns.some(col => {
        const value = this.getCellValue(row, col.field);
        return value?.toString().toLowerCase().includes(searchTerm);
      })
    );
  }

  private sortRows(rows: any[]): any[] {
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base',
    });
    const sortOrder = this.currentSortDirection() === 'desc' ? -1 : 1;

    return [...rows].sort((a, b) => {
      const valA = this.getCellValue(a, this.currentSortColumn());
      const valB = this.getCellValue(b, this.currentSortColumn());
      return collator.compare(valA, valB) * sortOrder;
    });
  }

  private matchesFilter(value: any, col: Column): boolean {
    const condition = col.condition!;
    const filterValue = col.value;

    switch (condition) {
      case 'is_null':
        return value == null || value === '';
      case 'is_not_null':
        return value != null && value !== '';
      default:
        return this.matchesValueFilter(value, filterValue, condition, col.type!);
    }
  }

  private matchesValueFilter(value: any, filterValue: any, condition: FilterCondition, type: ColumnType): boolean {
    if (!filterValue && filterValue !== 0 && filterValue !== false) return true;

    const strValue = value?.toString().toLowerCase() || '';
    const strFilter = filterValue.toString().toLowerCase();

    switch (type) {
      case 'string':
        return this.matchesStringFilter(strValue, strFilter, condition);
      case 'number':
        return this.matchesNumberFilter(Number(value), Number(filterValue), condition);
      case 'date':
        return this.matchesDateFilter(value, filterValue, condition);
      case 'bool':
        return value === filterValue;
      default:
        return strValue.includes(strFilter);
    }
  }

  private matchesStringFilter(value: string, filter: string, condition: FilterCondition): boolean {
    switch (condition) {
      case 'contain':
        return value.includes(filter);
      case 'not_contain':
        return !value.includes(filter);
      case 'equal':
        return value === filter;
      case 'not_equal':
        return value !== filter;
      case 'start_with':
        return value.startsWith(filter);
      case 'end_with':
        return value.endsWith(filter);
      default:
        return value.includes(filter);
    }
  }

  private matchesNumberFilter(value: number, filter: number, condition: FilterCondition): boolean {
    switch (condition) {
      case 'equal':
        return value === filter;
      case 'not_equal':
        return value !== filter;
      case 'greater_than':
        return value > filter;
      case 'greater_than_equal':
        return value >= filter;
      case 'less_than':
        return value < filter;
      case 'less_than_equal':
        return value <= filter;
      default:
        return value === filter;
    }
  }

  private matchesDateFilter(value: any, filter: any, condition: FilterCondition): boolean {
    const dateValue = this.formatDate(value);
    const dateFilter = filter;

    switch (condition) {
      case 'equal':
        return dateValue === dateFilter;
      case 'not_equal':
        return dateValue !== dateFilter;
      case 'greater_than':
        return dateValue > dateFilter;
      case 'less_than':
        return dateValue < dateFilter;
      default:
        return dateValue === dateFilter;
    }
  }

  private getCellValue(item: any, field: string): any {
    return field.split('.').reduce((obj, key) => obj?.[key], item);
  }

  private formatDate(date: any): string {
    if (!date) return '';
    try {
      const dt = new Date(date);
      const year = dt.getFullYear();
      const month = (dt.getMonth() + 1).toString().padStart(2, '0');
      const day = dt.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch {
      return '';
    }
  }

  formatCellValue(item: any, col: Column): string {
    const value = this.getCellValue(item, col.field);
    switch (col.type) {
      case 'bool':
        const yesText = this.finalTexts().booleanYes;
        const noText = this.finalTexts().booleanNo;
        return value ? yesText : noText;
      case 'date':
        return this.formatDisplayDate(value);
      case 'number':
        return this.formatNumber(value);
      default:
        return value?.toString() || '';
    }
  }

  private formatDisplayDate(date: any): string {
    if (!date) return '';
    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return date?.toString() || '';
    }
  }

  private formatNumber(value: any): string {
    if (value == null) return '';
    return Number(value).toLocaleString();
  }

  renderCell(col: Column, item: any): string {
    if (typeof col.cellRenderer === 'function') {
      return col.cellRenderer(item);
    }
    return col.cellRenderer || '';
  }

  getRowClass(item: any, index: number): string {
    const baseClass = `ngx-sdt-table__row--${index % 2 === 0 ? 'even' : 'odd'}`;
    const customClass = typeof this.rowClass() === 'function' ? (this.rowClass() as Function)(item) : this.rowClass();
    return `${baseClass} ${customClass}`.trim();
  }

  getCellClass(item: any, col: Column, colIndex: number): string {
    const classes = [];

    if (typeof this.cellClass() === 'function') {
      classes.push((this.cellClass() as Function)(item));
    } else if (this.cellClass()) {
      classes.push(this.cellClass());
    }

    if (col.cellClass) {
      classes.push(col.cellClass);
    }

    if (colIndex === 0 && this.stickyFirstColumn()) {
      classes.push('ngx-sdt-table__cell--sticky');
      if (this.hasCheckbox()) {
        classes.push('ngx-sdt-table__cell--sticky-offset-checkbox');
      }
    }

    return classes.join(' ');
  }

  getCellTypeClass(type?: ColumnType): string {
    switch (type) {
      case 'bool':
        return 'ngx-sdt-table__cell-content--boolean';
      case 'date':
        return 'ngx-sdt-table__cell-content--date';
      case 'number':
        return 'ngx-sdt-table__cell-content--number';
      default:
        return 'ngx-sdt-table__cell-content--text';
    }
  }

  getUniqueValue(item: any, index: number): any {
    return this.uniqueKey() ? this.getCellValue(item, this.uniqueKey()) : index;
  }

  trackByFn(index: number, item: any): any {
    return this.uniqueKey() ? this.getCellValue(item, this.uniqueKey()) : index;
  }

  private updateSelectedAll(): void {
    const selected = this.displayedRows().filter(row => row.selected);
    const total = this.displayedRows().length;

    if (selected.length === 0) {
      this.selectedAll.set(false);
    } else if (selected.length === total) {
      this.selectedAll.set(true);
    } else {
      this.selectedAll.set(null);
    }
  }

  private emitServerChange(changeType: string, resetPage = false): void {
    const state: DatatableState = {
      currentPage: resetPage ? 1 : this.currentPage(),
      pageSize: this.currentPageSize(),
      offset: (this.currentPage() - 1) * this.currentPageSize(),
      sortColumn: this.currentSortColumn(),
      sortDirection: this.currentSortDirection(),
      search: this.currentSearch(),
      columnFilters: this.columns(),
      changeType: changeType as any,
    };
    this.changeServer.emit(state);
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  reset(): void {
    this.currentPage.set(1);
    this.currentPageSize.set(this.pageSize());
    this.currentSortColumn.set(this.sortColumn());
    this.currentSortDirection.set(this.sortDirection());
    this.currentSearch.set('');

    this.columns().forEach(col => {
      col.value = '';
      col.condition = col.type === 'string' ? 'contain' : 'equal';
    });

    this.clearSelectedRows();
    this.filterChangeTrigger.update(val => val + 1);

    if (this.filterDebounceTimeout) {
      clearTimeout(this.filterDebounceTimeout);
    }
    if (this.searchDebounceTimeout) {
      clearTimeout(this.searchDebounceTimeout);
    }

    if (this.isServerMode()) {
      this.emitServerChange('reset', true);
    }
  }

  getSelectedRows(): any[] {
    return this.displayedRows().filter(row => row.selected);
  }

  getColumnFilters(): Column[] {
    return this.columns();
  }

  clearSelectedRows(): void {
    this.displayedRows().forEach(row => (row.selected = false));
    this.selectedAll.set(false);
  }

  selectRow(index: number): void {
    const row = this.displayedRows()[index];
    if (row) {
      row.selected = true;
      this.updateSelectedAll();
    }
  }

  unselectRow(index: number): void {
    const row = this.displayedRows()[index];
    if (row) {
      row.selected = false;
      this.updateSelectedAll();
    }
  }

  isRowSelected(index: number): boolean {
    const row = this.displayedRows()[index];
    return row?.selected || false;
  }
}
