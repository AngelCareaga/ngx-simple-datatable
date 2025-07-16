// projects/example/src/app/components/server-side-table/server-side-table.component.ts
import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';
import { SimpleDatatableComponent, Column, DatatableState } from 'ngx-simple-datatable';
import { ExampleCardComponent } from '../example-card/example-card.component';
import { SPANISH_TEXTS } from '../../../../../ngx-simple-datatable/src/lib/presets/text-presets';

interface ServerUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  isActive: boolean;
  city: string;
}

interface ServerParams {
  current_page: number;
  pagesize: number;
  sort_column: string;
  sort_direction: 'asc' | 'desc';
  column_filters: Column[];
  search: string;
}

@Component({
  selector: 'app-server-side-table',
  standalone: true,
  imports: [CommonModule, SimpleDatatableComponent, ExampleCardComponent],
  template: `
    <app-example-card
      title="Server-Side DataTable"
      description="DataTable with automatic debouncing, optimized server requests, and smart loading states. Features 300ms filter debouncing."
    >
      <div class="space-y-6">
        <div
          class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <div
                  [class]="
                    getServerStatus().isLoading
                      ? 'w-3 h-3 bg-amber-400 rounded-full animate-pulse'
                      : 'w-3 h-3 bg-emerald-400 rounded-full'
                  "
                ></div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ getServerStatus().message }}
                </span>
              </div>

              <div class="text-sm text-gray-500 dark:text-gray-400">
                Page {{ serverParams().current_page }} • {{ serverParams().pagesize }} per page
              </div>

              @if (getServerStatus().hasFilters) {
                <div class="flex items-center space-x-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                  <svg class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <span class="text-xs text-blue-700 dark:text-blue-300">Filters Active</span>
                </div>
              }
            </div>

            <div class="flex items-center space-x-4">
              <div class="text-sm text-gray-500 dark:text-gray-400">Total: {{ totalRows() }} records</div>
            </div>
          </div>

          @if (getServerStatus().isLoading && getServerStatus().hasFilters) {
            <div class="mt-3">
              <div class="w-full bg-gray-200 rounded-full h-1">
                <div class="bg-blue-600 h-1 rounded-full animate-pulse" style="width: 70%"></div>
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Processing filters with 300ms debouncing...
              </div>
            </div>
          }
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-soft overflow-hidden">
          <ngx-simple-datatable
            [rows]="rows()"
            [columns]="serverColumns()"
            [isServerMode]="true"
            [totalRows]="totalRows()"
            [loading]="serverLoading()"
            [hasCheckbox]="true"
            [pagination]="true"
            [sortable]="true"
            [columnFilter]="true"
            [filterDebounceTime]="300"
            [page]="serverParams().current_page"
            [pageSize]="serverParams().pagesize"
            [sortColumn]="serverParams().sort_column"
            [sortDirection]="serverParams().sort_direction"
            [search]="serverParams().search"
            [pageSizeOptions]="[3, 5, 10, 15]"
            skin="ngx-sdt-table--striped ngx-sdt-table--hover"
            tableClass="server-table"
            (changeServer)="onServerChange($event)"
            (rowSelect)="onRowSelect($event)"
            [texts]="SPANISH_TEXTS"
          >
          </ngx-simple-datatable>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
            <h4 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Server Parameters</h4>
            <div class="space-y-2 text-xs">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Page:</span>
                <span class="font-mono">{{ serverParams().current_page }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Page Size:</span>
                <span class="font-mono">{{ serverParams().pagesize }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Sort Column:</span>
                <span class="font-mono">{{ serverParams().sort_column }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Sort Direction:</span>
                <span class="font-mono">{{ serverParams().sort_direction }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Search:</span>
                <span class="font-mono">{{ serverParams().search || '(none)' }}</span>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
            <h4 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Performance Features</h4>
            <div class="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Automatic 300ms filter debouncing</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Instant sorting and pagination</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Smart loading states</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span>Request deduplication</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div class="flex items-start space-x-3">
            <svg
              class="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div>
              <h5 class="text-sm font-medium text-yellow-800 dark:text-yellow-300">Server-Side Features</h5>
              <p class="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                Try typing in the filter inputs to see the automatic debouncing in action. Notice how requests are
                optimally batched and the loading states provide clear feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </app-example-card>
  `,
})
export class ServerSideTableComponent {
  private readonly SERVER_REQUEST_DELAY = 800;

  private mockUsers: ServerUser[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      age: 28,
      department: 'Engineering',
      isActive: true,
      city: 'New York',
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      age: 32,
      department: 'Design',
      isActive: false,
      city: 'Los Angeles',
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@email.com',
      age: 24,
      department: 'Product',
      isActive: true,
      city: 'Chicago',
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@email.com',
      age: 29,
      department: 'Marketing',
      isActive: true,
      city: 'Houston',
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@email.com',
      age: 35,
      department: 'Sales',
      isActive: false,
      city: 'Phoenix',
    },
    {
      id: 6,
      firstName: 'Jennifer',
      lastName: 'Martinez',
      email: 'jennifer.martinez@email.com',
      age: 27,
      department: 'Design',
      isActive: true,
      city: 'Philadelphia',
    },
    {
      id: 7,
      firstName: 'Christopher',
      lastName: 'Anderson',
      email: 'chris.anderson@email.com',
      age: 31,
      department: 'Engineering',
      isActive: false,
      city: 'San Antonio',
    },
    {
      id: 8,
      firstName: 'Amanda',
      lastName: 'Taylor',
      email: 'amanda.taylor@email.com',
      age: 26,
      department: 'Marketing',
      isActive: true,
      city: 'San Diego',
    },
    {
      id: 9,
      firstName: 'James',
      lastName: 'Thomas',
      email: 'james.thomas@email.com',
      age: 33,
      department: 'Sales',
      isActive: true,
      city: 'Dallas',
    },
    {
      id: 10,
      firstName: 'Lisa',
      lastName: 'Jackson',
      email: 'lisa.jackson@email.com',
      age: 25,
      department: 'Design',
      isActive: false,
      city: 'San Jose',
    },
  ];

  rows = signal<ServerUser[]>([]);
  totalRows = signal(this.mockUsers.length);
  serverLoading = signal(false);
  selectedRows = signal<ServerUser[]>([]);

  serverParams = signal<ServerParams>({
    current_page: 1,
    pagesize: 5,
    sort_column: 'id',
    sort_direction: 'asc',
    column_filters: [],
    search: '',
  });

  serverColumns = signal<Column[]>([
    { field: 'id', title: 'ID', type: 'number', width: '80px', isUnique: true },
    { field: 'firstName', title: 'First Name', type: 'string' },
    { field: 'lastName', title: 'Last Name', type: 'string' },
    { field: 'email', title: 'Email', type: 'string' },
    { field: 'age', title: 'Age', type: 'number' },
    { field: 'department', title: 'Department', type: 'string' },
    { field: 'city', title: 'City', type: 'string' },
    { field: 'isActive', title: 'Active', type: 'bool' },
  ]);

  hasActiveServerFilters = computed(() => {
    const params = this.serverParams();
    return !!(params.search || params.column_filters.some(f => f.value));
  });

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.rows.set(this.mockUsers.slice(0, 5));
  }

  onServerChange(state: DatatableState) {
    console.log('Server change received:', state.changeType, state);

    this.serverLoading.set(true);
    this.serverParams.update(current => ({
      ...current,
      current_page: state.currentPage,
      pagesize: state.pageSize,
      sort_column: state.sortColumn,
      sort_direction: state.sortDirection,
      column_filters: state.columnFilters,
      search: state.search,
    }));

    this.performServerRequest(state);
  }

  private performServerRequest(state: DatatableState) {
    timer(this.SERVER_REQUEST_DELAY).subscribe(() => {
      const currentParams = this.serverParams();
      let filteredData = [...this.mockUsers];

      if (currentParams.search) {
        const searchTerm = currentParams.search.toLowerCase();
        filteredData = filteredData.filter(
          user =>
            user.firstName.toLowerCase().includes(searchTerm) ||
            user.lastName.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.department.toLowerCase().includes(searchTerm) ||
            user.city.toLowerCase().includes(searchTerm)
        );
      }

      if (currentParams.column_filters?.length > 0) {
        currentParams.column_filters.forEach(filter => {
          if (filter.value !== undefined && filter.value !== null && filter.value !== '') {
            filteredData = this.applyColumnFilter(filteredData, filter);
          }
        });
      }

      if (currentParams.sort_column) {
        filteredData.sort((a, b) => {
          const aValue = this.getNestedValue(a, currentParams.sort_column);
          const bValue = this.getNestedValue(b, currentParams.sort_column);

          let comparison = 0;
          if (aValue > bValue) comparison = 1;
          if (aValue < bValue) comparison = -1;

          return currentParams.sort_direction === 'desc' ? -comparison : comparison;
        });
      }

      const totalRows = filteredData.length;
      const startIndex = (currentParams.current_page - 1) * currentParams.pagesize;
      const endIndex = startIndex + currentParams.pagesize;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      this.rows.set(paginatedData);
      this.totalRows.set(totalRows);
      this.serverLoading.set(false);

      console.log(`Server response: ${paginatedData.length} rows of ${totalRows} total`);
    });
  }

  private applyColumnFilter(data: any[], filter: Column): any[] {
    return data.filter(item => {
      const value = this.getNestedValue(item, filter.field);
      const filterValue = filter.value;
      const condition = filter.condition || 'contain';

      switch (filter.type) {
        case 'string':
          return this.applyStringFilter(value, filterValue, condition);
        case 'number':
          return this.applyNumberFilter(value, filterValue, condition);
        case 'bool':
          return value === filterValue;
        default:
          return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
      }
    });
  }

  private applyStringFilter(value: any, filterValue: any, condition: string): boolean {
    const strValue = String(value || '').toLowerCase();
    const strFilter = String(filterValue || '').toLowerCase();

    switch (condition) {
      case 'contain':
        return strValue.includes(strFilter);
      case 'not_contain':
        return !strValue.includes(strFilter);
      case 'equal':
        return strValue === strFilter;
      case 'not_equal':
        return strValue !== strFilter;
      case 'start_with':
        return strValue.startsWith(strFilter);
      case 'end_with':
        return strValue.endsWith(strFilter);
      default:
        return strValue.includes(strFilter);
    }
  }

  private applyNumberFilter(value: any, filterValue: any, condition: string): boolean {
    const numValue = Number(value);
    const numFilter = Number(filterValue);

    switch (condition) {
      case 'equal':
        return numValue === numFilter;
      case 'not_equal':
        return numValue !== numFilter;
      case 'greater_than':
        return numValue > numFilter;
      case 'greater_than_equal':
        return numValue >= numFilter;
      case 'less_than':
        return numValue < numFilter;
      case 'less_than_equal':
        return numValue <= numFilter;
      default:
        return numValue === numFilter;
    }
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  onRowSelect(selectedRows: ServerUser[]) {
    this.selectedRows.set(selectedRows);
    console.log('Selected rows:', selectedRows);
  }

  getServerStatus() {
    return {
      isLoading: this.serverLoading(),
      hasFilters: this.hasActiveServerFilters(),
      message: this.serverLoading()
        ? this.hasActiveServerFilters()
          ? 'Filtering...'
          : 'Loading...'
        : this.hasActiveServerFilters()
          ? 'Filtered'
          : 'Ready',
    };
  }

  protected readonly SPANISH_TEXTS = SPANISH_TEXTS;
}
