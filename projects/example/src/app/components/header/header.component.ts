// ./projects/example/src/app/components/header/header.component.ts
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="glass-effect sticky top-0 z-50 animate-fade-in">
      <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <!-- Brand Section -->
          <div class="flex flex-col space-y-3">
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-medium"
              >
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>

              <div class="flex flex-col">
                <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-50">ngx-simple-datatable</h1>
                <p class="text-sm text-gray-600 dark:text-gray-400">Modern Angular DataTable</p>
              </div>
            </div>

            <!-- Badges and Links -->
            <div class="flex flex-wrap items-center gap-3">
              <div class="flex items-center space-x-2">
                <a
                  href="https://github.com/AngelCareaga/ngx-simple-datatable"
                  target="_blank"
                  class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-md"
                  aria-label="GitHub Repository"
                >
                  <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>

                <a
                  href="https://github.com/AngelCareaga/ngx-simple-datatable/stargazers"
                  target="_blank"
                  class="hover:shadow-md transition-shadow"
                >
                  <img
                    src="https://img.shields.io/github/stars/AngelCareaga/ngx-simple-datatable?style=social"
                    alt="GitHub stars"
                  />
                </a>
              </div>

              <div class="flex items-center space-x-2">
                <a
                  href="https://www.npmjs.com/package/ngx-simple-datatable"
                  target="_blank"
                  class="hover:shadow-md transition-shadow"
                >
                  <img src="https://img.shields.io/npm/v/ngx-simple-datatable.svg" alt="npm version" class="h-5" />
                </a>

                <span
                  class="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-medium"
                >
                  MIT License
                </span>

                <span
                  class="px-3 py-1 bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-400 rounded-full text-xs font-medium"
                >
                  Angular 17-20
                </span>
              </div>
            </div>
          </div>

          <!-- Actions Section -->
          <div class="flex items-center space-x-4">
            <div class="hidden lg:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span>by</span>
              <a
                href="https://angelcareaga.com"
                target="_blank"
                class="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                Angel Careaga
              </a>
            </div>

            <button
              (click)="toggleTheme()"
              class="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-md group"
              aria-label="Toggle theme"
            >
              <svg
                [class.hidden]="isDarkMode"
                class="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:rotate-12 transition-transform duration-200"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                [class.hidden]="!isDarkMode"
                class="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:-rotate-12 transition-transform duration-200"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent implements OnInit {
  isDarkMode = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.updateTheme();

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.isDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
    this.updateTheme();
  }

  private updateTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const htmlElement = document.documentElement;
      if (this.isDarkMode) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    }
  }
}
