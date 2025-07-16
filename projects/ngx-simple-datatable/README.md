# ngx-simple-datatable

<div align="center">

[![npm Version](https://img.shields.io/npm/v/ngx-simple-datatable.svg)](https://www.npmjs.com/package/ngx-simple-datatable)
[![Build Status](https://github.com/AngelCareaga/ngx-simple-datatable/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/AngelCareaga/ngx-simple-datatable/actions)
[![GitHub Stars](https://img.shields.io/github/stars/AngelCareaga/ngx-simple-datatable?style=social)](https://github.com/AngelCareaga/ngx-simple-datatable/stargazers)
[![Angular](https://img.shields.io/badge/Angular-17--20-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**A modern Angular DataTable component with Signal-based reactivity and intelligent column sizing**

[Live Examples](https://angelcareaga.github.io/ngx-simple-datatable/) • [Documentation](https://github.com/AngelCareaga/ngx-simple-datatable#readme) • [Report Bug](https://github.com/AngelCareaga/ngx-simple-datatable/issues)

</div>

## ✨ Features

- 🎯 **Angular Native** - Built specifically for Angular 17-20
- 🎭 **Standalone Components** - No NgModule required
- 🚀 **Signal-Based Reactivity** - Optimized performance with Angular signals
- 🎨 **Modern Control Flow** - Uses @if, @for, @switch syntax for better performance
- 📊 **Advanced Data Operations** - Sorting, filtering, pagination, and search
- 🔍 **Column Filtering** - Individual column filters with multiple conditions
- 📱 **Responsive Design** - Mobile-first approach with touch optimization
- 🎪 **Custom Templates** - Slot-based system for complete customization
- 🎨 **Comprehensive Theming** - CSS custom properties with dark mode support
- ⚡ **Performance Optimized** - Virtual scrolling and efficient rendering
- 📈 **Server-Side Support** - Full server-side operations compatibility
- ♿ **Accessibility First** - WCAG compliant with screen reader support
- 🔧 **TypeScript** - Full type safety and IntelliSense
- 🌍 **i18n Ready** - Internationalization support
- 📏 **Intelligent Column Sizing** - Multiple sizing strategies with responsive calculation
- 🔄 **Flexible Layout Control** - Auto-fit, auto-width, and hybrid sizing modes
- 📐 **Minimum Width Respect** - Preserve readability with configurable constraints
- ↔️ **Horizontal Scroll Support** - Optional horizontal scrolling for wide tables
- 🎛️ **Column Priority System** - Control which columns shrink first

## 🚀 Quick Start

### Installation

```bash
npm install ngx-simple-datatable
# or
yarn add ngx-simple-datatable
# or
pnpm add ngx-simple-datatable
```

### CSS Import

Add the CSS to your `angular.json`:

```json
{
  "styles": ["node_modules/ngx-simple-datatable/ngx-simple-datatable.css"]
}
```

Or import in your global `styles.css`:

```css
@import 'ngx-simple-datatable/ngx-simple-datatable.css';
```

### Basic Usage

```typescript
import { Component, signal } from '@angular/core';
import { SimpleDatatableComponent } from 'ngx-simple-datatable';
import { Column } from 'ngx-simple-datatable';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [SimpleDatatableComponent],
  template: `
    <ngx-simple-datatable
      [rows]="rows()"
      [columns]="columns()"
      [loading]="loading()"
      [hasCheckbox]="true"
      [pagination]="true"
      [sortable]="true"
      [columnFilter]="true"
      [columnSizingStrategy]="'hybrid'"
      [preserveReadability]="true"
      (rowSelect)="onRowSelect($event)"
      (sortChange)="onSortChange($event)"
    >
    </ngx-simple-datatable>
  `,
})
export class ExampleComponent {
  loading = signal(false);

  columns = signal<Column[]>([
    {
      field: 'id',
      title: 'ID',
      type: 'number',
      width: '80px',
      strict: true, // This column won't shrink
    },
    {
      field: 'name',
      title: 'Name',
      type: 'string',
      minWidth: '120px',
      preferredWidth: '200px',
    },
    {
      field: 'email',
      title: 'Email',
      type: 'string',
      shrinkPriority: 2, // Lower priority = shrinks first
    },
    {
      field: 'active',
      title: 'Active',
      type: 'bool',
      strict: true,
    },
    {
      field: 'createdAt',
      title: 'Created',
      type: 'date',
      shrinkPriority: 1,
    },
  ]);

  rows = signal([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      active: true,
      createdAt: new Date(),
    },
    // ... more data
  ]);

  onRowSelect(selectedRows: any[]) {
    console.log('Selected rows:', selectedRows);
  }

  onSortChange(event: { field: string; direction: 'asc' | 'desc' }) {
    console.log('Sort changed:', event);
  }
}
```

## 📋 Advanced Examples

### Column Sizing Strategies

```typescript
// Auto-fit: Columns expand to fill container (default)
@Component({
  template: `
    <ngx-simple-datatable
      [rows]="data()"
      [columns]="columns()"
      columnSizingStrategy="auto-fit"
      [expandToFillContainer]="true"
    >
    </ngx-simple-datatable>
  `,
})
export class AutoFitExample {}

// Auto-width: Respect minimum widths, allow horizontal scroll
@Component({
  template: `
    <ngx-simple-datatable
      [rows]="data()"
      [columns]="columns()"
      columnSizingStrategy="auto-width"
      [allowHorizontalScroll]="true"
      [preserveReadability]="true"
    >
    </ngx-simple-datatable>
  `,
})
export class AutoWidthExample {}

// Hybrid: Expand if space available, respect minimums
@Component({
  template: `
    <ngx-simple-datatable
      [rows]="data()"
      [columns]="columns()"
      columnSizingStrategy="hybrid"
      [respectColumnMinWidths]="true"
      minTableWidth="800px"
    >
    </ngx-simple-datatable>
  `,
})
export class HybridExample {}
```

### Advanced Column Configuration

```typescript
@Component({
  selector: 'app-advanced-columns',
  template: `
    <ngx-simple-datatable
      [rows]="users()"
      [columns]="advancedColumns()"
      [columnSizingStrategy]="'hybrid'"
      [preserveReadability]="true"
      [allowHorizontalScroll]="true"
    >
    </ngx-simple-datatable>
  `,
})
export class AdvancedColumnsComponent {
  advancedColumns = signal<Column[]>([
    {
      field: 'id',
      title: 'ID',
      type: 'number',
      width: '60px',
      strict: true, // Never shrink this column
      sort: true,
      filter: false,
    },
    {
      field: 'avatar',
      title: '',
      width: '50px',
      strict: true,
      sort: false,
      filter: false,
    },
    {
      field: 'name',
      title: 'Full Name',
      type: 'string',
      preferredWidth: '200px',
      minWidth: '120px',
      maxWidth: '300px',
      shrinkPriority: 3, // Lower priority = shrinks later
    },
    {
      field: 'email',
      title: 'Email Address',
      type: 'string',
      preferredWidth: '250px',
      minWidth: '150px',
      shrinkPriority: 1, // Higher priority = shrinks first
    },
    {
      field: 'department',
      title: 'Department',
      type: 'string',
      preferredWidth: '150px',
      minWidth: '100px',
      shrinkPriority: 2,
    },
    {
      field: 'salary',
      title: 'Salary',
      type: 'number',
      preferredWidth: '120px',
      minWidth: '100px',
      strict: false,
      cellRenderer: row => `$${row.salary.toLocaleString()}`,
    },
    {
      field: 'actions',
      title: 'Actions',
      width: '120px',
      strict: true,
      sort: false,
      filter: false,
    },
  ]);
}
```

### Responsive Tables

```typescript
@Component({
  selector: 'app-responsive-table',
  template: `
    <!-- Desktop: Auto-fit with full expansion -->
    <div class="d-none d-lg-block">
      <ngx-simple-datatable
        [rows]="data()"
        [columns]="columns()"
        columnSizingStrategy="auto-fit"
        [expandToFillContainer]="true"
      >
      </ngx-simple-datatable>
    </div>

    <!-- Tablet: Hybrid approach -->
    <div class="d-none d-md-block d-lg-none">
      <ngx-simple-datatable
        [rows]="data()"
        [columns]="columns()"
        columnSizingStrategy="hybrid"
        [respectColumnMinWidths]="true"
        [allowHorizontalScroll]="true"
      >
      </ngx-simple-datatable>
    </div>

    <!-- Mobile: Preserve readability with scroll -->
    <div class="d-md-none">
      <ngx-simple-datatable
        [rows]="data()"
        [columns]="mobileColumns()"
        columnSizingStrategy="auto-width"
        [preserveReadability]="true"
        [allowHorizontalScroll]="true"
        class="ngx-sdt-mobile-stack"
      >
      </ngx-simple-datatable>
    </div>
  `,
})
export class ResponsiveTableComponent {
  // Reduced columns for mobile
  mobileColumns = computed(() => this.columns().filter(col => ['name', 'email', 'actions'].includes(col.field)));
}
```

### Modern Angular 17+ Features

```typescript
import { Component, signal, computed } from '@angular/core';
import { SimpleDatatableComponent, SlotDirective } from 'ngx-simple-datatable';

@Component({
  selector: 'app-advanced-example',
  standalone: true,
  imports: [SimpleDatatableComponent, SlotDirective],
  template: `
    <ngx-simple-datatable
      [rows]="filteredUsers()"
      [columns]="columns()"
      [loading]="isLoading()"
      [stickyHeader]="true"
      [stickyFirstColumn]="true"
      [height]="'600px'"
      [columnSizingStrategy]="'hybrid'"
      [preserveReadability]="true"
      skin="ngx-sdt-table--striped ngx-sdt-table--hover"
      tableClass="modern-table"
      (rowClick)="onRowClick($event)"
      (filterChange)="onFilterChange($event)"
    >
      <!-- Custom Status Column -->
      <ng-template ngxSimpleDatatableSlot="status" let-data="data">
        @if (data.status === 'active') {
          <span class="badge bg-success">Active</span>
        } @else if (data.status === 'pending') {
          <span class="badge bg-warning">Pending</span>
        } @else {
          <span class="badge bg-danger">Inactive</span>
        }
      </ng-template>

      <!-- Custom Actions Column -->
      <ng-template ngxSimpleDatatableSlot="actions" let-data="data">
        <div class="btn-group">
          <button class="btn btn-sm btn-primary" (click)="editUser(data)">Edit</button>
          <button class="btn btn-sm btn-danger" (click)="deleteUser(data)">Delete</button>
        </div>
      </ng-template>

      <!-- Custom Avatar Column -->
      <ng-template ngxSimpleDatatableSlot="avatar" let-data="data">
        <img
          [src]="data.avatar || 'assets/default-avatar.png'"
          [alt]="data.name"
          class="rounded-circle"
          width="40"
          height="40"
        />
      </ng-template>
    </ngx-simple-datatable>
  `,
})
export class AdvancedExampleComponent {
  isLoading = signal(false);
  searchTerm = signal('');

  users = signal([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      status: 'active',
      role: 'Admin',
      avatar: 'https://i.pravatar.cc/150?img=1',
      salary: 75000,
      joinDate: new Date('2023-01-15'),
    },
    // ... more users
  ]);

  columns = signal<Column[]>([
    {
      field: 'avatar',
      title: '',
      width: '60px',
      sort: false,
      filter: false,
      strict: true,
    },
    {
      field: 'id',
      title: 'ID',
      type: 'number',
      width: '80px',
      isUnique: true,
      strict: true,
    },
    {
      field: 'name',
      title: 'Full Name',
      type: 'string',
      cellClass: 'fw-bold',
      preferredWidth: '200px',
      minWidth: '120px',
      shrinkPriority: 4,
    },
    {
      field: 'email',
      title: 'Email Address',
      type: 'string',
      preferredWidth: '250px',
      minWidth: '150px',
      shrinkPriority: 1,
    },
    {
      field: 'status',
      title: 'Status',
      type: 'string',
      width: '120px',
      strict: true,
    },
    {
      field: 'salary',
      title: 'Salary',
      type: 'number',
      cellRenderer: row => `$${row.salary.toLocaleString()}`,
      preferredWidth: '120px',
      minWidth: '100px',
      shrinkPriority: 3,
    },
    {
      field: 'joinDate',
      title: 'Join Date',
      type: 'date',
      preferredWidth: '140px',
      minWidth: '120px',
      shrinkPriority: 2,
    },
    {
      field: 'actions',
      title: 'Actions',
      width: '150px',
      sort: false,
      filter: false,
      strict: true,
    },
  ]);

  // Computed property using signals
  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.users();

    return this.users().filter(
      user => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
    );
  });

  onRowClick(event: { item: any; index: number }) {
    console.log('Row clicked:', event);
  }

  onFilterChange(columns: Column[]) {
    console.log('Filters changed:', columns);
  }

  editUser(user: any) {
    console.log('Edit user:', user);
  }

  deleteUser(user: any) {
    console.log('Delete user:', user);
  }
}
```

### Server-Side Operations

```typescript
@Component({
  template: `
    <ngx-simple-datatable
      [rows]="serverData()"
      [columns]="columns()"
      [isServerMode]="true"
      [totalRows]="totalRows()"
      [loading]="loading()"
      [page]="currentPage()"
      [pageSize]="pageSize()"
      [sortColumn]="sortColumn()"
      [sortDirection]="sortDirection()"
      [search]="searchTerm()"
      [columnSizingStrategy]="'hybrid'"
      [respectColumnMinWidths]="true"
      (changeServer)="onServerChange($event)"
    >
    </ngx-simple-datatable>
  `,
})
export class ServerSideComponent {
  serverData = signal<any[]>([]);
  totalRows = signal(0);
  loading = signal(false);
  currentPage = signal(1);
  pageSize = signal(10);
  sortColumn = signal('id');
  sortDirection = signal<'asc' | 'desc'>('asc');
  searchTerm = signal('');

  columns = signal<Column[]>([
    { field: 'id', title: 'ID', type: 'number', strict: true },
    { field: 'name', title: 'Name', type: 'string', minWidth: '120px' },
    { field: 'email', title: 'Email', type: 'string', minWidth: '150px' },
    { field: 'status', title: 'Status', type: 'string' },
  ]);

  constructor(private dataService: DataService) {
    this.loadData();
  }

  onServerChange(state: DatatableState) {
    this.loading.set(true);

    // Update current state
    this.currentPage.set(state.currentPage);
    this.pageSize.set(state.pageSize);
    this.sortColumn.set(state.sortColumn);
    this.sortDirection.set(state.sortDirection);
    this.searchTerm.set(state.search);

    // Load data from server
    this.dataService.getData(state).subscribe({
      next: response => {
        this.serverData.set(response.data);
        this.totalRows.set(response.total);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  private loadData() {
    this.onServerChange({
      currentPage: this.currentPage(),
      pageSize: this.pageSize(),
      offset: 0,
      sortColumn: this.sortColumn(),
      sortDirection: this.sortDirection(),
      search: this.searchTerm(),
      columnFilters: this.columns(),
      changeType: 'page',
    });
  }
}
```

### Custom Theming

```typescript
@Component({
  selector: 'app-themed-table',
  template: `
    <!-- Dark theme -->
    <ngx-simple-datatable class="dark-mode custom-theme" [rows]="data()" [columns]="columns()"> </ngx-simple-datatable>

    <!-- Custom corporate theme -->
    <ngx-simple-datatable class="corporate-theme" [rows]="data()" [columns]="columns()"> </ngx-simple-datatable>

    <!-- Bootstrap integration -->
    <ngx-simple-datatable class="bs-compat" [rows]="data()" [columns]="columns()"> </ngx-simple-datatable>
  `,
  styles: [
    `
      .custom-theme {
        --ngx-sdt-color-primary: #8b5cf6;
        --ngx-sdt-color-primary-hover: #7c3aed;
        --ngx-sdt-color-primary-light: #ede9fe;
        --ngx-sdt-border-radius-lg: 1rem;
        --ngx-sdt-shadow-md: 0 8px 32px rgba(139, 92, 246, 0.15);
      }

      .corporate-theme {
        --ngx-sdt-color-primary: #0f4c75;
        --ngx-sdt-color-secondary: #5a6c7d;
        --ngx-sdt-border-radius-md: 0.25rem;
        --ngx-sdt-font-weight-medium: 600;
      }
    `,
  ],
})
export class ThemedTableComponent {
  // ... component logic
}
```

## 🔧 API Reference

### Component Properties

| Property                 | Type                                | Default                    | Description                               |
| ------------------------ | ----------------------------------- | -------------------------- | ----------------------------------------- |
| `rows`                   | `any[]`                             | `[]`                       | Table data rows                           |
| `columns`                | `Column[]`                          | `[]`                       | Table column definitions                  |
| `loading`                | `boolean`                           | `false`                    | Show loading state                        |
| `isServerMode`           | `boolean`                           | `false`                    | Enable server-side operations             |
| `totalRows`              | `number`                            | `0`                        | Total rows for server-side pagination     |
| `hasCheckbox`            | `boolean`                           | `false`                    | Enable row selection checkboxes           |
| `selectRowOnClick`       | `boolean`                           | `false`                    | Select row on click                       |
| `search`                 | `string`                            | `''`                       | Global search term                        |
| `page`                   | `number`                            | `1`                        | Current page number                       |
| `pageSize`               | `number`                            | `10`                       | Rows per page                             |
| `pageSizeOptions`        | `number[]`                          | `[10, 20, 30, 50, 100]`    | Page size options                         |
| `showPageSize`           | `boolean`                           | `true`                     | Show page size selector                   |
| `sortable`               | `boolean`                           | `true`                     | Enable column sorting                     |
| `sortColumn`             | `string`                            | `'id'`                     | Default sort column                       |
| `sortDirection`          | `'asc' \| 'desc'`                   | `'asc'`                    | Default sort direction                    |
| `columnFilter`           | `boolean`                           | `false`                    | Enable column filtering                   |
| `pagination`             | `boolean`                           | `true`                     | Enable pagination                         |
| `showNumbers`            | `boolean`                           | `true`                     | Show page numbers                         |
| `showNumbersCount`       | `number`                            | `5`                        | Number of page buttons to show            |
| `showFirstPage`          | `boolean`                           | `true`                     | Show first page button                    |
| `showLastPage`           | `boolean`                           | `true`                     | Show last page button                     |
| `firstArrow`             | `string`                            | `''`                       | Custom first page arrow HTML              |
| `lastArrow`              | `string`                            | `''`                       | Custom last page arrow HTML               |
| `nextArrow`              | `string`                            | `''`                       | Custom next page arrow HTML               |
| `previousArrow`          | `string`                            | `''`                       | Custom previous page arrow HTML           |
| `paginationInfo`         | `string`                            | `'Showing {0} to {1}...'`  | Pagination info template                  |
| `noDataContent`          | `string`                            | `'No data available'`      | No data message                           |
| `stickyHeader`           | `boolean`                           | `false`                    | Fixed header                              |
| `height`                 | `string`                            | `'500px'`                  | Table height (when sticky header enabled) |
| `stickyFirstColumn`      | `boolean`                           | `false`                    | Fixed first column                        |
| `cloneHeaderInFooter`    | `boolean`                           | `false`                    | Clone header in footer                    |
| `skin`                   | `string`                            | `'ngx-sdt-table--striped'` | Table styling classes                     |
| `tableClass`             | `string`                            | `''`                       | Custom table CSS class                    |
| `rowClass`               | `string \| ((item: any) => string)` | `''`                       | Custom row CSS class                      |
| `cellClass`              | `string \| ((item: any) => string)` | `''`                       | Custom cell CSS class                     |
| `autoCalculateWidths`    | `boolean`                           | `true`                     | Auto-calculate column widths              |
| `expandToFillContainer`  | `boolean`                           | `true`                     | Expand table to fill container            |
| `columnSizingStrategy`   | `ColumnSizingStrategy`              | `'auto-fit'`               | Column sizing strategy                    |
| `respectColumnMinWidths` | `boolean`                           | `false`                    | Respect minimum column widths             |
| `allowHorizontalScroll`  | `boolean`                           | `true`                     | Allow horizontal scroll when needed       |
| `minTableWidth`          | `string`                            | `''`                       | Minimum table width                       |
| `preserveReadability`    | `boolean`                           | `true`                     | Preserve text readability over fitting    |

### Column Interface

```typescript
interface Column {
  field: string; // Data field name
  title?: string; // Display title
  type?: 'string' | 'number' | 'date' | 'bool'; // Column data type
  width?: string; // Fixed width
  minWidth?: string; // Minimum width
  maxWidth?: string; // Maximum width
  preferredWidth?: string; // Preferred width for hybrid mode
  strict?: boolean; // Never allow this column to shrink
  shrinkPriority?: number; // Priority for shrinking (1 = shrinks first)
  isUnique?: boolean; // Primary key field
  hide?: boolean; // Hide column
  filter?: boolean; // Enable filtering
  search?: boolean; // Include in global search
  sort?: boolean; // Enable sorting
  value?: any; // Filter value
  condition?: FilterCondition; // Filter condition
  cellRenderer?: ((item: any) => string) | string; // Custom cell renderer
  headerClass?: string; // Header CSS class
  cellClass?: string; // Cell CSS class
  html?: boolean; // Allow HTML content
}
```

### Column Sizing Strategies

```typescript
type ColumnSizingStrategy = 'auto-fit' | 'auto-width' | 'hybrid';

// auto-fit: Columns expand to fill available container width
// auto-width: Respect minimum widths, allow horizontal scroll
// hybrid: Expand if space available, respect minimums otherwise
```

### Filter Conditions

```typescript
type FilterCondition =
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
```

### Events

| Event            | Type                                       | Description                |
| ---------------- | ------------------------------------------ | -------------------------- |
| `changeServer`   | `EventEmitter<DatatableState>`             | Server-side state changes  |
| `sortChange`     | `EventEmitter<{field: string, direction}>` | Sort change event          |
| `searchChange`   | `EventEmitter<string>`                     | Search change event        |
| `pageChange`     | `EventEmitter<number>`                     | Page change event          |
| `pageSizeChange` | `EventEmitter<number>`                     | Page size change event     |
| `rowSelect`      | `EventEmitter<any[]>`                      | Row selection change event |
| `filterChange`   | `EventEmitter<Column[]>`                   | Filter change event        |
| `rowClick`       | `EventEmitter<RowClickEvent>`              | Row click event            |
| `rowDoubleClick` | `EventEmitter<any>`                        | Row double-click event     |

### Methods

| Method                 | Returns    | Description                      |
| ---------------------- | ---------- | -------------------------------- |
| `reset()`              | `void`     | Reset all filters and selections |
| `getSelectedRows()`    | `any[]`    | Get selected rows                |
| `getColumnFilters()`   | `Column[]` | Get column filter states         |
| `clearSelectedRows()`  | `void`     | Clear all selections             |
| `selectRow(index)`     | `void`     | Select row by index              |
| `unselectRow(index)`   | `void`     | Unselect row by index            |
| `isRowSelected(index)` | `boolean`  | Check if row is selected         |

## 🎨 Theming & Customization

### CSS Custom Properties

NgxSimpleDatatable uses CSS custom properties for comprehensive theming:

```css
:root {
  /* Primary Colors */
  --ngx-sdt-color-primary: #2563eb;
  --ngx-sdt-color-primary-hover: #1d4ed8;
  --ngx-sdt-color-primary-light: #dbeafe;

  /* Background Colors */
  --ngx-sdt-color-background: #ffffff;
  --ngx-sdt-color-background-gray: #f8fafc;

  /* Text Colors */
  --ngx-sdt-color-text: #1e293b;
  --ngx-sdt-color-text-muted: #64748b;

  /* Spacing */
  --ngx-sdt-spacing-sm: 0.5rem;
  --ngx-sdt-spacing-md: 0.75rem;
  --ngx-sdt-spacing-lg: 1rem;

  /* Typography */
  --ngx-sdt-font-size-sm: 0.875rem;
  --ngx-sdt-font-size-base: 0.875rem;
  --ngx-sdt-font-weight-medium: 500;

  /* Borders & Shadows */
  --ngx-sdt-border-radius-md: 0.5rem;
  --ngx-sdt-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
}
```

### Built-in Themes

```html
<!-- Dark theme -->
<ngx-simple-datatable class="dark-mode">
  <!-- Compact theme -->
  <ngx-simple-datatable class="ngx-sdt-theme-compact">
    <!-- Bootstrap compatibility -->
    <ngx-simple-datatable class="bs-compat">
      <!-- Tailwind CSS compatibility -->
      <ngx-simple-datatable class="tw-compat">
        <!-- Material Design compatibility -->
        <ngx-simple-datatable
          class="md-compat"
        ></ngx-simple-datatable></ngx-simple-datatable></ngx-simple-datatable></ngx-simple-datatable
></ngx-simple-datatable>
```

### Framework Integration

#### Tailwind CSS

```css
/* Custom Tailwind integration */
.my-datatable {
  @apply rounded-lg shadow-lg border border-gray-200;
  --ngx-sdt-color-primary: theme('colors.blue.600');
  --ngx-sdt-color-background: theme('colors.white');
  --ngx-sdt-border-radius-lg: theme('borderRadius.lg');
}
```

#### Bootstrap

```html
<!-- Bootstrap classes work seamlessly -->
<ngx-simple-datatable class="table-responsive border rounded">
  <ng-template ngxSimpleDatatableSlot="status" let-data="data">
    <span class="badge bg-success">{{ data.status }}</span>
  </ng-template>
</ngx-simple-datatable>
```

## 📱 Responsive Design

NgxSimpleDatatable is mobile-first and automatically adapts to different screen sizes:

```html
<!-- Enable mobile stack mode -->
<ngx-simple-datatable class="ngx-sdt-mobile-stack"></ngx-simple-datatable>

<!-- Responsive column sizing -->
<ngx-simple-datatable
  columnSizingStrategy="hybrid"
  [preserveReadability]="true"
  [allowHorizontalScroll]="true"
></ngx-simple-datatable>
```

### Breakpoint Customization

```css
.my-responsive-table {
  /* Custom breakpoints */
  --ngx-sdt-breakpoint-sm: 640px;
  --ngx-sdt-breakpoint-md: 768px;
  --ngx-sdt-breakpoint-lg: 1024px;
}
```

## 🔄 Migration Guide

### From @bhplugin/ng-datatable

This library is inspired by and designed as a modern replacement for `@bhplugin/ng-datatable`. Here's how to migrate:

#### 1. Installation

```bash
# Remove old package
npm uninstall @bhplugin/ng-datatable

# Install new package
npm install ngx-simple-datatable
```

#### 2. Import Changes

```typescript
// Before
import { DataTableModule } from '@bhplugin/ng-datatable';

// After
import { SimpleDatatableComponent } from 'ngx-simple-datatable';

@Component({
  standalone: true,
  imports: [SimpleDatatableComponent], // No module needed
})
```

#### 3. Template Updates

```html
<!-- Before -->
<ng-datatable [rows]="rows" [columns]="cols"></ng-datatable>

<!-- After -->
<ngx-simple-datatable [rows]="rows" [columns]="columns"></ngx-simple-datatable>
```

#### 4. Column Definition Changes

```typescript
// Before
cols: Array<colDef> = [{ field: 'name', title: 'Name' }];

// After
columns = signal<Column[]>([
  {
    field: 'name',
    title: 'Name',
    type: 'string',
    preferredWidth: '200px',
    minWidth: '120px',
  },
]);
```

#### 5. Signal-based Reactivity

```typescript
// Before
rows: Array<any> = [];

// After (recommended)
rows = signal<any[]>([]);

// Or keep existing approach
rows: any[] = [];
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- Angular CLI 17+

### Setup

```bash
git clone https://github.com/AngelCareaga/ngx-simple-datatable.git
cd ngx-simple-datatable
npm install
```

### Development Server

```bash
npm start
```

### Build Library

```bash
ng build ngx-simple-datatable
```

### Run Tests

```bash
ng test
```

### Code Formatting

This project uses [Prettier](https://prettier.io/) for code formatting:

```bash
npm run format
```

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation for any API changes
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[@bhplugin/ng-datatable](https://github.com/bhplugin/ng-datatable)** - Created by BH Plugin, which served as the primary inspiration for this modern Angular implementation
- **Angular Team** - For the amazing framework and Angular 17+ features
- **Community Contributors** - For feedback and feature requests

## 📞 Support

- 📧 Email: [dev.angelcareaga@gmail.com](mailto:dev.angelcareaga@gmail.com)
- 🐛 Issues: [GitHub Issues](https://github.com/AngelCareaga/ngx-simple-datatable/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/AngelCareaga/ngx-simple-datatable/discussions)
- 🌐 Website: [angelcareaga.com](https://angelcareaga.com)

---

<div align="center">

**Made with ❤️ by [Angel Careaga](https://angelcareaga.com)**

[⭐ Star this repo](https://github.com/AngelCareaga/ngx-simple-datatable/stargazers) if you found it helpful!

</div>
