// ./projects/example/src/app/components/hero/hero.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div class="max-w-6xl mx-auto">
        <!-- Hero Content -->
        <div class="text-center mb-16">
          <div
            class="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8 animate-scale-in"
          >
            <span class="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></span>
            Signal-Based • Reactive • TypeScript Ready
          </div>

          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Modern Angular
            <br class="hidden sm:block" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-700">
              DataTable
            </span>
          </h2>

          <p class="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            A powerful Angular DataTable component built with modern signals, standalone components, and comprehensive
            theming support for Angular 17-20.
          </p>

          <!-- Feature Pills -->
          <div class="flex flex-wrap justify-center gap-3 mb-12">
            @for (feature of features; track feature) {
              <span
                class="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-700 dark:text-gray-300 font-medium shadow-soft hover:shadow-md transition-all duration-200"
              >
                {{ feature }}
              </span>
            }
          </div>
        </div>

        <!-- Installation Cards -->
        <div class="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <!-- Installation -->
          <div class="card-modern p-8 hover:shadow-large transition-shadow duration-300">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-950 rounded-xl flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50">Quick Installation</h3>
            </div>

            <div class="bg-gray-900 dark:bg-black rounded-xl p-6 font-mono text-sm border border-gray-800">
              <div class="flex items-center space-x-2 mb-3">
                <span class="text-emerald-400">$</span>
                <span class="text-gray-100">npm install ngx-simple-datatable</span>
              </div>
              <div class="text-gray-400 text-xs"># or yarn add ngx-simple-datatable</div>
            </div>
          </div>

          <!-- Quick Start -->
          <div class="card-modern p-8 hover:shadow-large transition-shadow duration-300">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-primary-100 dark:bg-primary-950 rounded-xl flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-primary-600 dark:text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50">Quick Start</h3>
            </div>

            <div class="bg-gray-900 dark:bg-black rounded-xl p-6 font-mono text-sm border border-gray-800">
              <div class="text-blue-400 mb-2">import</div>
              <div class="text-gray-100 mb-2">{{ '{' }} SimpleDatatableComponent {{ '}' }}</div>
              <div class="text-gray-400 mb-4">from 'ngx-simple-datatable';</div>
              <div class="text-yellow-400">&lt;ngx-simple-datatable&gt;</div>
              <div class="text-yellow-400">&lt;/ngx-simple-datatable&gt;</div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="text-center mt-16">
          <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://github.com/AngelCareaga/ngx-simple-datatable"
              target="_blank"
              class="btn-primary hover:scale-105 transition-transform"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              View on GitHub
            </a>

            <a
              href="https://www.npmjs.com/package/ngx-simple-datatable"
              target="_blank"
              class="btn-secondary hover:scale-105 transition-transform"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763zM5.13 5.323l13.837.019-.009 5.183H13.82v5.895h-3.564V10.525H5.113L5.13 5.323z"
                />
              </svg>
              View on NPM
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  features = ['Angular 17-20', 'Signal-Based', 'Server-Side', 'TypeScript', 'Responsive', 'Themeable', 'Accessible'];
}
