// projects/example/src/app/components/basic-table/basic-table.component.ts
import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimpleDatatableComponent, Column } from 'ngx-simple-datatable';
import { ExampleCardComponent } from '../example-card/example-card.component';
import { SPANISH_TEXTS } from '../../../../../ngx-simple-datatable/src/lib/presets/text-presets';

interface BasicUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  isActive: boolean;
  department: string;
  joinDate: Date;
}

@Component({
  selector: 'app-basic-table',
  standalone: true,
  imports: [CommonModule, FormsModule, SimpleDatatableComponent, ExampleCardComponent],
  template: `
    <app-example-card
      title="Basic DataTable"
      description="Simple data table with sorting, filtering, and pagination. Client-side operations with automatic filtering."
    >
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div class="flex-1 max-w-md">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                id="search"
                type="text"
                [ngModel]="searchTerm()"
                (ngModelChange)="onGlobalSearch($event)"
                placeholder="Search users..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          @if (selectedRowsCount() > 0) {
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ selectedRowsCount() }} selected</span>
              <button
                (click)="exportSelection()"
                class="px-3 py-1 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-md transition-colors"
              >
                Export CSV
              </button>
            </div>
          }
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-soft overflow-hidden">
          <ngx-simple-datatable
            [rows]="rows()"
            [columns]="basicColumns()"
            [loading]="loading()"
            [search]="searchTerm()"
            [hasCheckbox]="true"
            [pagination]="true"
            [sortable]="true"
            [columnFilter]="true"
            [pageSize]="5"
            [pageSizeOptions]="[5, 10, 20]"
            skin="ngx-sdt-table--striped ngx-sdt-table--hover"
            tableClass="modern-table"
            (rowSelect)="onRowSelect($event)"
            (sortChange)="onSortChange($event)"
            (filterChange)="onFilterChange($event)"
            (rowClick)="onRowClick($event)"
            (pageChange)="onPageChange($event)"
            (pageSizeChange)="onPageSizeChange($event)"
            [texts]="SPANISH_TEXTS"
          >
          </ngx-simple-datatable>
        </div>
      </div>
    </app-example-card>
  `,
})
export class BasicTableComponent {
  loading = signal(false);
  searchTerm = signal('');
  selectedRows = signal<BasicUser[]>([]);

  mockUsers: BasicUser[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      age: 28,
      isActive: true,
      department: 'Engineering',
      joinDate: new Date('2023-01-15'),
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      age: 32,
      isActive: false,
      department: 'Design',
      joinDate: new Date('2022-08-10'),
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@email.com',
      age: 24,
      isActive: true,
      department: 'Product',
      joinDate: new Date('2023-05-20'),
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@email.com',
      age: 29,
      isActive: true,
      department: 'Marketing',
      joinDate: new Date('2022-11-30'),
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@email.com',
      age: 35,
      isActive: false,
      department: 'Sales',
      joinDate: new Date('2021-03-12'),
    },
  ];

  rows = signal<BasicUser[]>(this.mockUsers);

  basicColumns = signal<Column[]>([
    { field: 'id', title: 'ID', type: 'number', width: '80px', isUnique: true },
    { field: 'firstName', title: 'First Name', type: 'string' },
    { field: 'lastName', title: 'Last Name', type: 'string' },
    { field: 'email', title: 'Email', type: 'string' },
    { field: 'age', title: 'Age', type: 'number' },
    { field: 'department', title: 'Department', type: 'string' },
    { field: 'isActive', title: 'Active', type: 'bool' },
  ]);

  selectedRowsCount = computed(() => this.selectedRows().length);

  onRowSelect(selectedRows: BasicUser[]) {
    this.selectedRows.set(selectedRows);
    console.log('Selected rows:', selectedRows);
  }

  onSortChange(event: { field: string; direction: 'asc' | 'desc' }) {
    console.log('Sort changed:', event);
  }

  onFilterChange(columns: Column[]) {
    console.log('Filters changed:', columns);
  }

  onRowClick(event: { item: BasicUser; index: number }) {
    console.log('Row clicked:', event);
  }

  onPageChange(page: number) {
    console.log('Page changed to:', page);
  }

  onPageSizeChange(pageSize: number) {
    console.log('Page size changed to:', pageSize);
  }

  onGlobalSearch(term: string) {
    this.searchTerm.set(term);
  }

  exportSelection() {
    const selected = this.selectedRows();
    if (selected.length === 0) {
      alert('No rows selected for export');
      return;
    }

    const csvContent = this.convertToCSV(selected);
    this.downloadCSV(csvContent, 'selected-users.csv');
    console.log(`Exported ${selected.length} selected users to CSV`);
  }

  private convertToCSV(data: BasicUser[]): string {
    if (data.length === 0) return '';

    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Age', 'Department', 'Active'];
    const rows = data.map(user => [
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.age,
      user.department,
      user.isActive ? 'Yes' : 'No',
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  private downloadCSV(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  protected readonly SPANISH_TEXTS = SPANISH_TEXTS;
}
