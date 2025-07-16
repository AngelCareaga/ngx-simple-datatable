// projects/ngx-simple-datatable/src/lib/components/column-header/column-header.component.ts
import { Component, computed, input, output, signal, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Column, ColumnWidth, SortDirection } from '../../interfaces/column.interface';
import { DatatableTexts } from '../../interfaces/datatable-texts.interface';
import { ColumnFilterComponent } from '../column-filter/column-filter.component';
import { FilterIconComponent } from '../icons/filter-icon.component';
import { CheckIconComponent } from '../icons/check-icon.component';
import { DashIconComponent } from '../icons/dash-icon.component';

@Component({
  selector: 'ngx-simple-datatable-column-header',
  standalone: true,
  template: `
    <tr>
      @if (hasCheckbox()) {
        <th
          class="ngx-sdt-checkbox"
          [class.ngx-sdt-table__header-cell--sticky]="stickyHeader() || stickyFirstColumn()"
          [style.width.px]="checkboxColumnWidth()"
          [style.min-width.px]="checkboxColumnWidth()"
          [style.max-width.px]="checkboxColumnWidth()"
        >
          <div class="ngx-sdt-checkbox__container">
            <input
              #selectAllCheckbox
              type="checkbox"
              class="ngx-sdt-checkbox__input"
              [checked]="selectedAll() === true"
              [indeterminate]="selectedAll() === null"
              [attr.aria-label]="texts().selectAll"
              (click)="onSelectAll(selectAllCheckbox.checked); $event.stopPropagation()"
            />
            <div class="ngx-sdt-checkbox__visual">
              <ngx-check-icon class="ngx-sdt-checkbox__check-icon" />
              <ngx-dash-icon class="ngx-sdt-checkbox__dash-icon" />
            </div>
          </div>
        </th>
      }
      @for (col of visibleColumns(); track col.field; let j = $index) {
        <th
          [class]="getHeaderClass(col, j)"
          [style.width.px]="getColumnWidth(col.field)"
          [style.min-width.px]="getColumnWidth(col.field)"
          [style.max-width.px]="getColumnWidth(col.field)"
        >
          <div
            class="ngx-sdt-header__content"
            [class]="col.headerClass || ''"
            [class.ngx-sdt-header-cell--sortable]="sortable() && col.sort"
            [attr.aria-label]="getSortAriaLabel(col)"
            (click)="onSort(col)"
          >
            <span class="ngx-sdt-header__title">{{ col.title }}</span>

            @if (sortable() && col.sort) {
              <div class="ngx-sdt-header__sort-indicators">
                @switch (getSortDirection(col.field)) {
                  @case ('asc') {
                    <svg class="ngx-sdt-header__sort-icon ngx-sdt-header__sort-icon--asc" viewBox="0 0 14 14">
                      <polygon points="3.11,6.25 10.89,6.25 7,1.75" />
                    </svg>
                  }
                  @case ('desc') {
                    <svg class="ngx-sdt-header__sort-icon ngx-sdt-header__sort-icon--desc" viewBox="0 0 14 14">
                      <polygon points="7,12.25 10.89,7.75 3.11,7.75" />
                    </svg>
                  }
                  @default {
                    <svg class="ngx-sdt-header__sort-icon ngx-sdt-header__sort-icon--none" viewBox="0 0 14 14">
                      <polygon points="3.11,6.25 10.89,6.25 7,1.75" />
                      <polygon points="7,12.25 10.89,7.75 3.11,7.75" />
                    </svg>
                  }
                }
              </div>
            }
          </div>

          @if (columnFilter() && !isFooter() && col.filter) {
            <div class="ngx-sdt-header__filter-container">
              @switch (col.type) {
                @case ('string') {
                  <input
                    [(ngModel)]="col.value"
                    type="text"
                    class="ngx-sdt-header__filter-input"
                    [class]="filterInputClass()"
                    [placeholder]="texts().filterPlaceholder"
                    (keyup)="onFilterChange()"
                    (click)="$event.stopPropagation()"
                  />
                }
                @case ('number') {
                  <input
                    [(ngModel)]="col.value"
                    type="number"
                    class="ngx-sdt-header__filter-input"
                    [class]="filterInputClass()"
                    [placeholder]="texts().filterPlaceholder"
                    (keyup)="onFilterChange()"
                    (click)="$event.stopPropagation()"
                  />
                }
                @case ('date') {
                  <input
                    [(ngModel)]="col.value"
                    type="date"
                    class="ngx-sdt-header__filter-input"
                    [class]="filterInputClass()"
                    (change)="onFilterChange()"
                    (click)="$event.stopPropagation()"
                  />
                }
                @case ('bool') {
                  <select
                    [(ngModel)]="col.value"
                    class="ngx-sdt-header__filter-select"
                    [class]="filterInputClass()"
                    (change)="onFilterChange(); closeFilterMenu()"
                    (click)="$event.stopPropagation()"
                  >
                    <option [ngValue]="undefined">{{ texts().booleanAll }}</option>
                    <option [ngValue]="true">{{ texts().booleanTrue }}</option>
                    <option [ngValue]="false">{{ texts().booleanFalse }}</option>
                  </select>
                }
              }

              @if (col.type !== 'bool') {
                <button
                  type="button"
                  class="ngx-sdt-header__filter-button"
                  [class]="filterButtonClass()"
                  [attr.aria-label]="texts().filterMenu"
                  (click)="toggleFilterMenu(col); $event.stopPropagation()"
                >
                  <ngx-filter-icon />
                </button>

                @if (openFilterColumn() === col.field) {
                  <ngx-simple-datatable-column-filter
                    [column]="col"
                    [texts]="texts()"
                    (close)="closeFilterMenu()"
                    (filterChange)="onFilterChange()"
                  />
                }
              }
            </div>
          }
        </th>
      }
    </tr>
  `,
  imports: [
    CommonModule,
    FormsModule,
    ColumnFilterComponent,
    FilterIconComponent,
    CheckIconComponent,
    DashIconComponent,
  ],
})
export class ColumnHeaderComponent {
  columns = input.required<Column[]>();
  hasCheckbox = input(false);
  stickyHeader = input(false);
  stickyFirstColumn = input(false);
  sortable = input(true);
  sortColumn = input('');
  sortDirection = input<SortDirection>('asc');
  columnFilter = input(false);
  selectedAll = input<boolean | null>(null);
  isFooter = input(false);
  columnWidths = input.required<ColumnWidth[]>();
  checkboxColumnWidth = input(52);
  filterInputClass = input('');
  filterButtonClass = input('');
  texts = input.required<Required<DatatableTexts>>();

  selectAll = output<boolean>();
  sortChange = output<string>();
  filterChange = output<void>();

  openFilterColumn = signal<string | null>(null);

  private destroyRef = inject(DestroyRef);

  visibleColumns = computed(() => this.columns().filter(col => !col.hide));

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.openFilterColumn.set(null);
    });
  }

  getColumnWidth(field: string): number {
    const columnWidth = this.columnWidths().find(col => col.field === field);
    return columnWidth ? columnWidth.width : 100;
  }

  onSelectAll(checked: boolean): void {
    this.selectAll.emit(checked);
  }

  onSort(col: Column): void {
    if (this.sortable() && col.sort) {
      this.sortChange.emit(col.field);
    }
  }

  onFilterChange(): void {
    setTimeout(() => {
      this.filterChange.emit();
    }, 0);
  }

  toggleFilterMenu(col: Column): void {
    const currentOpen = this.openFilterColumn();
    this.openFilterColumn.set(currentOpen === col.field ? null : col.field);
  }

  closeFilterMenu(): void {
    this.openFilterColumn.set(null);
  }

  getSortDirection(field: string): SortDirection | null {
    return this.sortColumn() === field ? this.sortDirection() : null;
  }

  getSortAriaLabel(col: Column): string {
    if (!this.sortable() || !col.sort) return '';

    const direction = this.getSortDirection(col.field);
    if (direction === 'asc') {
      return this.texts().sortDescending;
    } else if (direction === 'desc') {
      return this.texts().sortAscending;
    }
    return this.texts().sortAscending;
  }

  getHeaderClass(col: Column, index: number): string {
    const classes = ['ngx-sdt-header-cell'];
    if (this.sortable() && col.sort) {
      classes.push('ngx-sdt-header-cell--sortable');
    }

    if (index === 0 && this.stickyFirstColumn()) {
      classes.push('ngx-sdt-header-cell--sticky-first');
      if (this.hasCheckbox()) {
        classes.push('ngx-sdt-table__cell--sticky-offset-checkbox');
      }
    }

    return classes.join(' ');
  }
}
