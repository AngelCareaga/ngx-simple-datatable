// projects/ngx-simple-datatable/src/lib/directives/slot.directive.ts
import { Directive, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngxSimpleDatatableSlot]',
  standalone: true,
})
export class SlotDirective {
  fieldName = input.required<string>({ alias: 'ngxSimpleDatatableSlot' });
  value = input<any>({ alias: 'ngxSimpleDatatableSlotValue' });

  constructor(public templateRef: TemplateRef<any>) {}
}
