// projects/example/src/app/components/advanced-table/advanced-table.component.ts
import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleDatatableComponent, SlotDirective, Column } from 'ngx-simple-datatable';
import { ExampleCardComponent } from '../example-card/example-card.component';
import { SPANISH_TEXTS } from '../../../../../ngx-simple-datatable/src/lib/presets/text-presets';

interface AdvancedUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  avatar: string;
  role: string;
  salary: number;
  isActive: boolean;
  address: { city: string };
  joinDate: Date;
}

@Component({
  selector: 'app-advanced-table',
  standalone: true,
  imports: [CommonModule, SimpleDatatableComponent, SlotDirective, ExampleCardComponent],
  template: `
    <app-example-card
      title="Advanced DataTable"
      description="Feature-rich data table with custom templates, actions, sticky header, and enhanced styling."
    >
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Advanced features: Custom slots, sticky header, row actions
          </div>

          @if (selectedRowsCount() > 0) {
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ selectedRowsCount() }} selected</span>
              <button
                (click)="clearSelection()"
                class="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
              >
                Clear
              </button>
              <button
                (click)="exportSelection()"
                class="px-3 py-1 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-md transition-colors"
              >
                Export
              </button>
            </div>
          }
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-soft overflow-hidden">
          <ngx-simple-datatable
            [rows]="rows()"
            [columns]="advancedColumns()"
            [loading]="loading()"
            [hasCheckbox]="true"
            [pagination]="true"
            [sortable]="true"
            [columnFilter]="true"
            [pageSize]="8"
            [pageSizeOptions]="[5, 8, 15, 25]"
            [stickyHeader]="true"
            [height]="'600px'"
            skin="ngx-sdt-table--striped ngx-sdt-table--hover"
            tableClass="advanced-table"
            (rowSelect)="onRowSelect($event)"
            (sortChange)="onSortChange($event)"
            (filterChange)="onFilterChange($event)"
            (rowClick)="onRowClick($event)"
            [texts]="SPANISH_TEXTS"
          >
            <ng-template ngxSimpleDatatableSlot="avatar" let-data="data">
              <div class="flex items-center">
                <img
                  [src]="data.avatar"
                  [alt]="data.firstName + ' ' + data.lastName"
                  class="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                />
              </div>
            </ng-template>

            <ng-template ngxSimpleDatatableSlot="firstName" let-data="data">
              <div class="flex flex-col">
                <span class="font-semibold text-gray-900 dark:text-gray-100">
                  {{ data.firstName }} {{ data.lastName }}
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ data.address.city }}
                </span>
              </div>
            </ng-template>

            <ng-template ngxSimpleDatatableSlot="role" let-data="data">
              <span [class]="getRoleColor(data.role)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                {{ data.role }}
              </span>
            </ng-template>

            <ng-template ngxSimpleDatatableSlot="salary" let-data="data">
              <span class="font-mono font-semibold text-gray-900 dark:text-gray-100">
                {{ formatSalary(data) }}
              </span>
            </ng-template>

            <ng-template ngxSimpleDatatableSlot="isActive" let-data="data">
              <span [class]="getUserStatus(data).class" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                <span
                  class="w-1.5 h-1.5 rounded-full mr-1.5 mt-0.5"
                  [class]="data.isActive ? 'bg-emerald-400' : 'bg-red-400'"
                ></span>
                {{ getUserStatus(data).label }}
              </span>
            </ng-template>

            <ng-template ngxSimpleDatatableSlot="actions" let-data="data">
              <div class="flex items-center space-x-1">
                <button
                  (click)="viewProfile(data); $event.stopPropagation()"
                  class="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                  title="View Profile"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                </button>
                <button
                  (click)="editUser(data); $event.stopPropagation()"
                  class="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-md transition-colors"
                  title="Edit User"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                </button>
                <button
                  (click)="deleteUser(data); $event.stopPropagation()"
                  class="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                  title="Delete User"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </ng-template>
          </ngx-simple-datatable>
        </div>
      </div>
    </app-example-card>
  `,
})
export class AdvancedTableComponent {
  loading = signal(false);
  selectedRows = signal<AdvancedUser[]>([]);

  mockUsers: AdvancedUser[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      age: 28,
      avatar: 'https://i.pravatar.cc/40?img=1',
      role: 'Developer',
      salary: 75000,
      isActive: true,
      address: { city: 'New York' },
      joinDate: new Date('2023-01-15'),
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      age: 32,
      avatar: 'https://i.pravatar.cc/40?img=2',
      role: 'Designer',
      salary: 68000,
      isActive: false,
      address: { city: 'Los Angeles' },
      joinDate: new Date('2022-08-10'),
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@email.com',
      age: 24,
      avatar: 'https://i.pravatar.cc/40?img=3',
      role: 'Manager',
      salary: 85000,
      isActive: true,
      address: { city: 'Chicago' },
      joinDate: new Date('2023-05-20'),
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@email.com',
      age: 29,
      avatar: 'https://i.pravatar.cc/40?img=4',
      role: 'Developer',
      salary: 72000,
      isActive: true,
      address: { city: 'Houston' },
      joinDate: new Date('2022-11-30'),
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@email.com',
      age: 35,
      avatar: 'https://i.pravatar.cc/40?img=5',
      role: 'Analyst',
      salary: 65000,
      isActive: false,
      address: { city: 'Phoenix' },
      joinDate: new Date('2021-03-12'),
    },
  ];

  rows = signal<AdvancedUser[]>(this.mockUsers);

  advancedColumns = signal<Column[]>([
    { field: 'avatar', title: '', width: '60px', sort: false, filter: false },
    { field: 'id', title: 'ID', type: 'number', width: '80px', isUnique: true },
    { field: 'firstName', title: 'Name', type: 'string' },
    { field: 'email', title: 'Email', type: 'string' },
    { field: 'role', title: 'Role', type: 'string' },
    { field: 'salary', title: 'Salary', type: 'number' },
    { field: 'isActive', title: 'Status', type: 'string' },
    { field: 'actions', title: 'Actions', width: '120px', sort: false, filter: false },
  ]);

  selectedRowsCount = computed(() => this.selectedRows().length);

  onRowSelect(selectedRows: AdvancedUser[]) {
    this.selectedRows.set(selectedRows);
    console.log('Selected rows:', selectedRows);
  }

  onSortChange(event: { field: string; direction: 'asc' | 'desc' }) {
    console.log('Sort changed:', event);
  }

  onFilterChange(columns: Column[]) {
    console.log('Filters changed:', columns);
  }

  onRowClick(event: { item: AdvancedUser; index: number }) {
    console.log('Row clicked:', event);
  }

  clearSelection() {
    this.selectedRows.set([]);
    console.log('Selection cleared');
  }

  exportSelection() {
    const selected = this.selectedRows();
    if (selected.length === 0) {
      alert('No rows selected for export');
      return;
    }
    console.log(`Exported ${selected.length} selected users`);
  }

  editUser(user: AdvancedUser) {
    console.log('Edit user:', user);
    alert(`Editing user: ${user.firstName} ${user.lastName}`);
  }

  deleteUser(user: AdvancedUser) {
    console.log('Delete user:', user);
    if (confirm(`Delete user ${user.firstName} ${user.lastName}?`)) {
      this.rows.update(users => users.filter(u => u.id !== user.id));
      console.log(`User ${user.firstName} ${user.lastName} deleted successfully`);
    }
  }

  viewProfile(user: AdvancedUser) {
    console.log('View profile:', user);
    alert(`Viewing profile: ${user.firstName} ${user.lastName}`);
  }

  formatSalary(user: AdvancedUser): string {
    return `$${user.salary.toLocaleString()}`;
  }

  getUserStatus(user: AdvancedUser): { label: string; class: string } {
    return user.isActive
      ? { label: 'Active', class: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400' }
      : { label: 'Inactive', class: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' };
  }

  getRoleColor(role: string): string {
    const colors: Record<string, string> = {
      Developer: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      Designer: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      Manager: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400',
      Analyst: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400',
    };
    return colors[role] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }

  protected readonly SPANISH_TEXTS = SPANISH_TEXTS;
}
