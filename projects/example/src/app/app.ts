// ./projects/example/src/app/app.ts
import { Component, computed, DestroyRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { timer } from 'rxjs';
import { Column, DatatableState, SimpleDatatableComponent, SlotDirective } from 'ngx-simple-datatable';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ExampleCardComponent } from './components/example-card/example-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { SPANISH_TEXTS } from '../../../ngx-simple-datatable/src/lib/presets/text-presets';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  dob: string;
  address: { city: string };
  isActive: boolean;
  avatar: string;
  role: string;
  salary: number;
  joinDate: Date;
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
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [
    CommonModule,
    FormsModule,
    SimpleDatatableComponent,
    SlotDirective,
    HeaderComponent,
    HeroComponent,
    ExampleCardComponent,
    FooterComponent,
  ],
})
export class App implements OnInit, OnDestroy {
  private destroyRef = inject(DestroyRef);
  private readonly SERVER_REQUEST_DELAY = 800;

  private mockUsers: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      age: 28,
      dob: '1995-03-15',
      address: { city: 'New York' },
      isActive: true,
      avatar: 'https://i.pravatar.cc/40?img=1',
      role: 'Developer',
      salary: 75000,
      joinDate: new Date('2023-01-15'),
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      age: 32,
      dob: '1991-07-22',
      address: { city: 'Los Angeles' },
      isActive: false,
      avatar: 'https://i.pravatar.cc/40?img=2',
      role: 'Designer',
      salary: 68000,
      joinDate: new Date('2022-08-10'),
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@email.com',
      age: 24,
      dob: '1999-12-08',
      address: { city: 'Chicago' },
      isActive: true,
      avatar: 'https://i.pravatar.cc/40?img=3',
      role: 'Manager',
      salary: 85000,
      joinDate: new Date('2023-05-20'),
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@email.com',
      age: 29,
      dob: '1994-05-12',
      address: { city: 'Houston' },
      isActive: true,
      avatar: 'https://i.pravatar.cc/40?img=4',
      role: 'Developer',
      salary: 72000,
      joinDate: new Date('2022-11-30'),
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@email.com',
      age: 35,
      dob: '1988-11-03',
      address: { city: 'Phoenix' },
      isActive: false,
      avatar: 'https://i.pravatar.cc/40?img=5',
      role: 'Analyst',
      salary: 65000,
      joinDate: new Date('2021-03-12'),
    },
    {
      id: 6,
      firstName: 'Jennifer',
      lastName: 'Martinez',
      email: 'jennifer.martinez@email.com',
      age: 27,
      dob: '1996-09-18',
      address: { city: 'Philadelphia' },
      isActive: true,
      avatar: 'https://i.pravatar.cc/40?img=6',
      role: 'Designer',
      salary: 70000,
      joinDate: new Date('2023-02-28'),
    },
    {
      id: 7,
      firstName: 'Christopher',
      lastName: 'Anderson',
      email: 'chris.anderson@email.com',
      age: 31,
      dob: '1992-04-25',
      address: { city: 'San Antonio' },
      isActive: false,
      avatar: 'https://i.pravatar.cc/40?img=7',
      role: 'Manager',
      salary: 88000,
      joinDate: new Date('2020-12-05'),
    },
    {
      id: 8,
      firstName: 'Amanda',
      lastName: 'Taylor',
      email: 'amanda.taylor@email.com',
      age: 26,
      dob: '1997-08-14',
      address: { city: 'San Diego' },
      isActive: true,
      avatar: 'https://i.pravatar.cc/40?img=8',
      role: 'Developer',
      salary: 74000,
      joinDate: new Date('2023-06-15'),
    },
    {
      id: 9,
      firstName: 'James',
      lastName: 'Thomas',
      email: 'james.thomas@email.com',
      age: 33,
      dob: '1990-01-30',
      address: { city: 'Dallas' },
      isActive: true,
      avatar: 'https://i.pravatar.cc/40?img=9',
      role: 'Analyst',
      salary: 67000,
      joinDate: new Date('2022-04-18'),
    },
    {
      id: 10,
      firstName: 'Lisa',
      lastName: 'Jackson',
      email: 'lisa.jackson@email.com',
      age: 25,
      dob: '1998-06-07',
      address: { city: 'San Jose' },
      isActive: false,
      avatar: 'https://i.pravatar.cc/40?img=10',
      role: 'Designer',
      salary: 69000,
      joinDate: new Date('2023-09-03'),
    },
    {
      id: 11,
      firstName: 'Robert',
      lastName: 'White',
      email: 'robert.white@email.com',
      age: 30,
      dob: '1993-02-14',
      address: { city: 'Austin' },
      isActive: true,
      avatar: 'https://i.pravatar.cc/40?img=11',
      role: 'Developer',
      salary: 76000,
      joinDate: new Date('2023-03-10'),
    },
    {
      id: 12,
      firstName: 'Jessica',
      lastName: 'Harris',
      email: 'jessica.harris@email.com',
      age: 28,
      dob: '1995-10-20',
      address: { city: 'Jacksonville' },
      isActive: true,
      avatar: 'https://i.pravatar.cc/40?img=12',
      role: 'Manager',
      salary: 82000,
      joinDate: new Date('2022-07-22'),
    },
    {
      id: 13,
      firstName: 'William',
      lastName: 'Clark',
      email: 'william.clark@email.com',
      age: 34,
      dob: '1989-06-11',
      address: { city: 'Fort Worth' },
      isActive: false,
      avatar: 'https://i.pravatar.cc/40?img=13',
      role: 'Analyst',
      salary: 64000,
      joinDate: new Date('2021-09-15'),
    },
    {
      id: 14,
      firstName: 'Ashley',
      lastName: 'Lewis',
      email: 'ashley.lewis@email.com',
      age: 26,
      dob: '1997-12-03',
      address: { city: 'Columbus' },
      isActive: true,
      avatar: 'https://i.pravatar.cc/40?img=14',
      role: 'Designer',
      salary: 71000,
      joinDate: new Date('2023-04-12'),
    },
    {
      id: 15,
      firstName: 'Matthew',
      lastName: 'Walker',
      email: 'matthew.walker@email.com',
      age: 29,
      dob: '1994-08-19',
      address: { city: 'Charlotte' },
      isActive: true,
      avatar: 'https://i.pravatar.cc/40?img=15',
      role: 'Developer',
      salary: 73000,
      joinDate: new Date('2022-12-08'),
    },
  ];

  loading = signal(false);
  searchTerm = signal('');
  currentExample = signal<'basic' | 'advanced' | 'server'>('basic');
  selectedRows = signal<User[]>([]);
  currentSort = signal<{ field: string; direction: 'asc' | 'desc' } | null>(null);
  activeFilters = signal<Column[]>([]);

  basicColumns = signal<Column[]>([
    { field: 'id', title: 'ID', type: 'number', width: '80px', isUnique: true },
    { field: 'firstName', title: 'First Name', type: 'string' },
    { field: 'lastName', title: 'Last Name', type: 'string' },
    { field: 'email', title: 'Email', type: 'string' },
    { field: 'age', title: 'Age', type: 'number' },
    { field: 'isActive', title: 'Active', type: 'bool' },
  ]);

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

  serverColumns = signal<Column[]>([
    { field: 'id', title: 'ID', type: 'number', width: '80px', isUnique: true },
    { field: 'firstName', title: 'First Name', type: 'string' },
    { field: 'lastName', title: 'Last Name', type: 'string' },
    { field: 'email', title: 'Email', type: 'string' },
    { field: 'age', title: 'Age', type: 'number' },
    { field: 'address.city', title: 'City', type: 'string' },
    { field: 'role', title: 'Role', type: 'string' },
    { field: 'isActive', title: 'Active', type: 'bool' },
  ]);

  rows = signal<User[]>(this.mockUsers);
  totalRows = signal(this.mockUsers.length);
  serverLoading = signal(false);

  serverParams = signal<ServerParams>({
    current_page: 1,
    pagesize: 5,
    sort_column: 'id',
    sort_direction: 'asc',
    column_filters: [],
    search: '',
  });

  activeFiltersCount = computed(() => {
    return this.activeFilters().filter(
      filter => filter.value !== undefined && filter.value !== null && filter.value !== ''
    ).length;
  });

  selectedRowsCount = computed(() => this.selectedRows().length);

  hasActiveServerFilters = computed(() => {
    const params = this.serverParams();
    return !!(params.search || params.column_filters.some(f => f.value));
  });

  ngOnInit() {
    this.loadInitialData();
  }

  ngOnDestroy() {}

  private loadInitialData() {
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
    }, 1000);
  }

  onRowSelect(selectedRows: User[]) {
    this.selectedRows.set(selectedRows);
    console.log('📊 Selected rows:', selectedRows);

    if (selectedRows.length > 0) {
      const names = selectedRows.map(user => `${user.firstName} ${user.lastName}`).join(', ');
      console.log(`✅ Selected users: ${names}`);
    } else {
      console.log('❌ No users selected');
    }
  }

  onSortChange(event: { field: string; direction: 'asc' | 'desc' }) {
    this.currentSort.set(event);
    console.log('🔄 Sort changed:', event);
    console.log(`📈 Sorting by ${event.field} in ${event.direction}ending order`);
  }

  onFilterChange(columns: Column[]) {
    const filtersWithValues = columns.filter(col => col.value !== undefined && col.value !== null && col.value !== '');

    this.activeFilters.set(filtersWithValues);
    console.log('🔍 Filters changed:', columns);

    if (filtersWithValues.length > 0) {
      console.log('🎯 Active filters:');
      filtersWithValues.forEach(filter => {
        console.log(`  - ${filter.title}: ${filter.value} (${filter.condition})`);
      });
    } else {
      console.log('🚫 No active filters');
    }
  }

  onRowClick(event: { item: User; index: number }) {
    console.log('👆 Row clicked:', event);
    console.log(`👤 User: ${event.item.firstName} ${event.item.lastName} (${event.item.email})`);
  }

  onPageChange(page: number) {
    console.log('📄 Page changed to:', page);
  }

  onPageSizeChange(pageSize: number) {
    console.log('📏 Page size changed to:', pageSize);
  }

  onSearchChange(searchTerm: string) {
    console.log('🔎 Search changed to:', searchTerm);
    if (searchTerm) {
      console.log(`🔍 Searching for: "${searchTerm}"`);
    } else {
      console.log('🔍 Search cleared');
    }
  }

  editUser(user: User) {
    console.log('✏️ Edit user:', user);
    alert(`Editing user: ${user.firstName} ${user.lastName}`);
  }

  deleteUser(user: User) {
    console.log('🗑️ Delete user:', user);
    if (confirm(`Delete user ${user.firstName} ${user.lastName}?`)) {
      this.rows.update(users => users.filter(u => u.id !== user.id));
      console.log(`✅ User ${user.firstName} ${user.lastName} deleted successfully`);
    }
  }

  viewProfile(user: User) {
    console.log('👤 View profile:', user);
    alert(`Viewing profile: ${user.firstName} ${user.lastName}`);
  }

  switchExample(example: 'basic' | 'advanced' | 'server') {
    this.currentExample.set(example);
    this.clearSelection();
    this.clearFilters();

    if (example === 'basic' || example === 'advanced') {
      this.rows.set([...this.mockUsers]);
      this.totalRows.set(this.mockUsers.length);
    } else if (example === 'server') {
      this.resetServerParams();
    }

    console.log(`🔄 Switched to ${example} example`);
  }

  onGlobalSearch(term: string) {
    this.searchTerm.set(term);
    this.onSearchChange(term);
  }

  clearSelection() {
    this.selectedRows.set([]);
    console.log('🗑️ Selection cleared');
  }

  clearFilters() {
    this.activeFilters.set([]);
    console.log('🧹 Filters cleared');
  }

  exportSelection() {
    const selected = this.selectedRows();
    if (selected.length === 0) {
      alert('No rows selected for export');
      return;
    }

    const csvContent = this.convertToCSV(selected);
    this.downloadCSV(csvContent, 'selected-users.csv');
    console.log(`📊 Exported ${selected.length} selected users to CSV`);
  }

  private convertToCSV(data: User[]): string {
    if (data.length === 0) return '';

    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Age', 'City', 'Role', 'Salary', 'Active'];
    const rows = data.map(user => [
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.age,
      user.address.city,
      user.role,
      user.salary,
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

  onServerChange(state: DatatableState) {
    console.log('📤 Server change received:', state.changeType, state);

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
            user.address.city.toLowerCase().includes(searchTerm) ||
            user.role.toLowerCase().includes(searchTerm)
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

      console.log(`📊 Server response: ${paginatedData.length} rows of ${totalRows} total`);
    });
  }

  private resetServerParams() {
    this.serverParams.set({
      current_page: 1,
      pagesize: 5,
      sort_column: 'id',
      sort_direction: 'asc',
      column_filters: [],
      search: '',
    });
    this.rows.set(this.mockUsers.slice(0, 5));
    this.totalRows.set(this.mockUsers.length);
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
        case 'date':
          return this.applyDateFilter(value, filterValue, condition);
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

  private applyDateFilter(value: any, filterValue: any, condition: string): boolean {
    const dateValue = new Date(value).getTime();
    const dateFilter = new Date(filterValue).getTime();

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

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  formatSalary(user: User): string {
    return `$${user.salary.toLocaleString()}`;
  }

  getUserStatus(user: User): { label: string; class: string } {
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
