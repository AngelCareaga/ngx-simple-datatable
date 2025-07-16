import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-example-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-modern p-8 mb-8 hover:shadow-large transition-all duration-300 animate-fade-in">
      <div class="mb-6">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">{{ title() }}</h3>
        <p class="text-gray-600 dark:text-gray-400">{{ description() }}</p>
      </div>

      <ng-content></ng-content>
    </div>
  `,
})
export class ExampleCardComponent {
  title = input.required<string>();
  description = input.required<string>();
}
