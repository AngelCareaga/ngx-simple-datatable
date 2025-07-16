// projects/ngx-simple-datatable/src/lib/components/column-filter/column-filter.component.ts
import { afterNextRender, Component, input, output, DestroyRef, inject, signal } from '@angular/core';
import { Column, FilterCondition } from '../../interfaces/column.interface';
import { DatatableTexts } from '../../interfaces/datatable-texts.interface';

@Component({
  selector: 'ngx-simple-datatable-column-filter',
  standalone: true,
  template: `
    <div class="ngx-sdt-filter-menu">
      <div class="ngx-sdt-filter-menu__options" (click)="$event.stopPropagation()">
        <button
          type="button"
          class="ngx-sdt-filter-menu__option"
          [class.ngx-sdt-filter-menu__option--active]="column().condition === ''"
          (click)="selectCondition('')"
        >
          {{ texts().noFilter }}
        </button>

        @if (column().type === 'string') {
          <button
            type="button"
            class="ngx-sdt-filter-menu__option"
            [class.ngx-sdt-filter-menu__option--active]="column().condition === 'contain'"
            (click)="selectCondition('contain')"
          >
            {{ texts().contains }}
          </button>
          <button
            type="button"
            class="ngx-sdt-filter-menu__option"
            [class.ngx-sdt-filter-menu__option--active]="column().condition === 'not_contain'"
            (click)="selectCondition('not_contain')"
          >
            {{ texts().notContains }}
          </button>
          <button
            type="button"
            class="ngx-sdt-filter-menu__option"
            [class.ngx-sdt-filter-menu__option--active]="column().condition === 'equal'"
            (click)="selectCondition('equal')"
          >
            {{ texts().equals }}
          </button>
          <button
            type="button"
            class="ngx-sdt-filter-menu__option"
            [class.ngx-sdt-filter-menu__option--active]="column().condition === 'not_equal'"
            (click)="selectCondition('not_equal')"
          >
            {{ texts().notEquals }}
          </button>
          <button
            type="button"
            class="ngx-sdt-filter-menu__option"
            [class.ngx-sdt-filter-menu__option--active]="column().condition === 'start_with'"
            (click)="selectCondition('start_with')"
          >
            {{ texts().startsWith }}
          </button>
          <button
            type="button"
            class="ngx-sdt-filter-menu__option"
            [class.ngx-sdt-filter-menu__option--active]="column().condition === 'end_with'"
            (click)="selectCondition('end_with')"
          >
            {{ texts().endsWith }}
          </button>
        }

        @if (column().type === 'number') {
          <button
            type="button"
            class="ngx-sdt-filter-menu__option"
            [class.ngx-sdt-filter-menu__option--active]="column().condition === 'equal'"
            (click)="selectCondition('equal')"
          >
            {{ texts().equals }}
          </button>
          <button
            type="button"
            class="ngx-sdt-filter-menu__option"
            [class.ngx-sdt-filter-menu__option--active]="column().condition === 'not_equal'"
            (click)="selectCondition('not_equal')"
          >
            {{ texts().notEquals }}
          </button>
          <button
            type="button"
            class="ngx-sdt-filter-menu__option"
            [class.ngx-sdt-filter-menu__option--active]="column().condition === 'greater_than'"
            (click)="selectCondition('greater_than')"
          >
            {{ texts().greaterThan }}
          </button>
          <button
            type="button"
            class="ngx-sdt-filter-menu__option"
            [class.ngx-sdt-filter-menu__option--active]="column().condition === 'greater_than_equal'"
            (click)="selectCondition('greater_than_equal')"
          >
            {{ texts().greaterThanEqual }}
          </button>
          <button
            type="button"
            class="ngx-sdt-filter-menu__option"
            [class.ngx-sdt-filter-menu__option--active]="column().condition === 'less_than'"
            (click)="selectCondition('less_than')"
          >
            {{ texts().lessThan }}
          </button>
          <button
            type="button"
            class="ngx-sdt-filter-menu__option"
            [class.ngx-sdt-filter-menu__option--active]="column().condition === 'less_than_equal'"
            (click)="selectCondition('less_than_equal')"
          >
            {{ texts().lessThanEqual }}
          </button>
        }

        @if (column().type === 'date') {
          <button
            type="button"
            class="ngx-sdt-filter-menu__option"
            [class.ngx-sdt-filter-menu__option--active]="column().condition === 'equal'"
            (click)="selectCondition('equal')"
          >
            {{ texts().equals }}
          </button>
          <button
            type="button"
            class="ngx-sdt-filter-menu__option"
            [class.ngx-sdt-filter-menu__option--active]="column().condition === 'not_equal'"
            (click)="selectCondition('not_equal')"
          >
            {{ texts().notEquals }}
          </button>
          <button
            type="button"
            class="ngx-sdt-filter-menu__option"
            [class.ngx-sdt-filter-menu__option--active]="column().condition === 'greater_than'"
            (click)="selectCondition('greater_than')"
          >
            {{ texts().after }}
          </button>
          <button
            type="button"
            class="ngx-sdt-filter-menu__option"
            [class.ngx-sdt-filter-menu__option--active]="column().condition === 'less_than'"
            (click)="selectCondition('less_than')"
          >
            {{ texts().before }}
          </button>
        }

        <button
          type="button"
          class="ngx-sdt-filter-menu__option"
          [class.ngx-sdt-filter-menu__option--active]="column().condition === 'is_null'"
          (click)="selectCondition('is_null')"
        >
          {{ texts().isEmpty }}
        </button>
        <button
          type="button"
          class="ngx-sdt-filter-menu__option"
          [class.ngx-sdt-filter-menu__option--active]="column().condition === 'is_not_null'"
          (click)="selectCondition('is_not_null')"
        >
          {{ texts().isNotEmpty }}
        </button>
      </div>
    </div>
  `,
  imports: [],
})
export class ColumnFilterComponent {
  column = input.required<Column>();
  texts = input.required<Required<DatatableTexts>>();

  close = output<void>();
  filterChange = output<void>();

  private destroyRef = inject(DestroyRef);
  private isDestroyed = signal(false);
  private boundClickHandler?: (event: Event) => void;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.isDestroyed.set(true);
      this.removeDocumentListener();
    });

    afterNextRender(() => {
      this.addDocumentListener();
    });
  }

  private addDocumentListener(): void {
    this.boundClickHandler = this.handleDocumentClick.bind(this);
    document.addEventListener('click', this.boundClickHandler);
  }

  private removeDocumentListener(): void {
    if (this.boundClickHandler) {
      document.removeEventListener('click', this.boundClickHandler);
      this.boundClickHandler = undefined;
    }
  }

  private handleDocumentClick(): void {
    if (!this.isDestroyed()) {
      this.close.emit();
    }
  }

  selectCondition(condition: FilterCondition): void {
    if (this.isDestroyed()) {
      return;
    }

    const col = this.column();
    col.condition = condition;

    if (condition === '' || condition === 'is_null' || condition === 'is_not_null') {
      col.value = '';
    }

    this.filterChange.emit();
    this.close.emit();
  }
}
