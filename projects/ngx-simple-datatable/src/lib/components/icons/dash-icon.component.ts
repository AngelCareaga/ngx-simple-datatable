// projects/ngx-simple-datatable/src/lib/components/icons/dash-icon.component.ts
import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ngx-dash-icon',
  imports: [NgClass],
  template: `
    <svg
      [ngClass]="class"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      stroke-width="3"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  `,
})
export class DashIconComponent {
  class = input('');
}
