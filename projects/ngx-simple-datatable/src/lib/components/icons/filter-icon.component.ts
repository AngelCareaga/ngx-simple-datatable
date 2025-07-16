// projects/ngx-simple-datatable/src/lib/components/icons/filter-icon.component.ts
import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ngx-filter-icon',
  imports: [NgClass],
  template: `
    <svg
      [ngClass]="class"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      stroke-width="1.5"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
  `,
})
export class FilterIconComponent {
  class = input('');
}
