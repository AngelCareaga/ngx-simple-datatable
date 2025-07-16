// projects/example/src/app/app.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { FooterComponent } from './components/footer/footer.component';
import { BasicTableComponent } from './components/basic-table/basic-table.component';
import { AdvancedTableComponent } from './components/advanced-table/advanced-table.component';
import { ServerSideTableComponent } from './components/server-side-table/server-side-table.component';
import { TemplateExamplesComponent } from './components/template-examples/template-examples.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    FooterComponent,
    BasicTableComponent,
    AdvancedTableComponent,
    ServerSideTableComponent,
    TemplateExamplesComponent,
  ],
})
export class App {
  currentExample = signal<'basic' | 'advanced' | 'server' | 'templates'>('basic');

  switchExample(example: 'basic' | 'advanced' | 'server' | 'templates') {
    this.currentExample.set(example);
    console.log(`🔄 Switched to ${example} example`);
  }

  getTabClass(tab: string): string {
    return this.currentExample() === tab
      ? 'bg-primary-600 text-white shadow-sm'
      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100';
  }
}
