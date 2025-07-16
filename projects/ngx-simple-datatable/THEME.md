# NgxSimpleDatatable - Theming Guide

## Overview

NgxSimpleDatatable provides extensive theming capabilities through CSS custom properties (variables), allowing for complete visual customization while maintaining functionality and accessibility. The theming system is built with a modular architecture that supports responsive design, framework compatibility, and accessibility standards.

## CSS Custom Properties

### Core Colors

```css
:root {
  --ngx-sdt-color-primary: #2563eb;
  --ngx-sdt-color-primary-hover: #1d4ed8;
  --ngx-sdt-color-primary-light: #dbeafe;
  --ngx-sdt-color-secondary: #64748b;
  --ngx-sdt-color-accent: #7c3aed;
}
```

### Extended Color Palette

```css
:root {
  /* Status Colors */
  --ngx-sdt-color-success: #059669;
  --ngx-sdt-color-error: #dc2626;
  --ngx-sdt-color-warning: #d97706;
  --ngx-sdt-color-overlay: rgba(255, 255, 255, 0.85);
}
```

### Text Colors

```css
:root {
  --ngx-sdt-color-text: #1e293b;
  --ngx-sdt-color-text-muted: #64748b;
  --ngx-sdt-color-text-light: #94a3b8;
}
```

### Background Colors

```css
:root {
  --ngx-sdt-color-background: #ffffff;
  --ngx-sdt-color-background-gray: #f8fafc;
  --ngx-sdt-color-background-gray-hover: #f1f5f9;
  --ngx-sdt-color-background-gray-light: rgba(248, 250, 252, 0.6);
  --ngx-sdt-color-background-gray-alt: rgba(241, 245, 249, 0.4);
  --ngx-sdt-color-background-soft: #fefefe;
}
```

### Border Colors

```css
:root {
  --ngx-sdt-color-border: #e2e8f0;
  --ngx-sdt-color-border-hover: #cbd5e1;
  --ngx-sdt-color-border-light: #f1f5f9;
}
```

### Spacing System

```css
:root {
  --ngx-sdt-spacing-xs: 0.375rem; /* 6px */
  --ngx-sdt-spacing-sm: 0.5rem; /* 8px */
  --ngx-sdt-spacing-md: 0.75rem; /* 12px */
  --ngx-sdt-spacing-lg: 1rem; /* 16px */
  --ngx-sdt-spacing-xl: 1.5rem; /* 24px */
  --ngx-sdt-spacing-2xl: 2rem; /* 32px */
  --ngx-sdt-spacing-3xl: 2.5rem; /* 40px */
}
```

### Typography

```css
:root {
  /* Font Sizes */
  --ngx-sdt-font-size-xs: 0.75rem; /* 12px */
  --ngx-sdt-font-size-sm: 0.875rem; /* 14px */
  --ngx-sdt-font-size-base: 0.875rem; /* 14px */
  --ngx-sdt-font-size-md: 0.9375rem; /* 15px */
  --ngx-sdt-font-size-lg: 1rem; /* 16px */

  /* Font Weights */
  --ngx-sdt-font-weight-normal: 400;
  --ngx-sdt-font-weight-medium: 500;
  --ngx-sdt-font-weight-semibold: 600;
  --ngx-sdt-font-weight-bold: 700;
}
```

### Border Radius

```css
:root {
  --ngx-sdt-border-radius-xs: 0.25rem; /* 4px */
  --ngx-sdt-border-radius-sm: 0.375rem; /* 6px */
  --ngx-sdt-border-radius-md: 0.5rem; /* 8px */
  --ngx-sdt-border-radius-lg: 0.75rem; /* 12px */
  --ngx-sdt-border-radius-xl: 1rem; /* 16px */
}
```

### Shadows

```css
:root {
  --ngx-sdt-shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.02);
  --ngx-sdt-shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.04);
  --ngx-sdt-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
  --ngx-sdt-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
}
```

### Transitions and Animations

```css
:root {
  --ngx-sdt-transition-all: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --ngx-sdt-transition-colors:
    background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --ngx-sdt-transition-transform: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Component-Specific Variables

#### Table Dimensions

```css
:root {
  --ngx-sdt-table-width: 100%;
  --ngx-sdt-table-height: auto;
  --ngx-sdt-table-max-height: none;
  --ngx-sdt-table-min-height: 200px;
}
```

#### Cell Padding Variants

```css
:root {
  --ngx-sdt-cell-padding-compact: 0.5rem 0.75rem;
  --ngx-sdt-cell-padding-normal: 0.875rem 1rem;
  --ngx-sdt-cell-padding-xs: 0.375rem 0.5rem;
  --ngx-sdt-cell-padding-sm: 0.5rem 0.75rem;
  --ngx-sdt-cell-padding-md: 0.625rem 0.875rem;
}
```

#### Checkbox Variables

```css
:root {
  --ngx-sdt-checkbox-size: 1.125rem;
  --ngx-sdt-checkbox-column-width: 52px;
  --ngx-sdt-checkbox-border-radius: var(--ngx-sdt-border-radius-sm);
  --ngx-sdt-checkbox-checked-background: var(--ngx-sdt-color-primary);
}
```

#### Filter Input Responsive Heights

```css
:root {
  --ngx-sdt-filter-input-height-xs: 28px;
  --ngx-sdt-filter-input-height-sm: 30px;
  --ngx-sdt-filter-input-height-md: 32px;
  --ngx-sdt-filter-input-height-lg: 36px;

  --ngx-sdt-filter-button-width-xs: 28px;
  --ngx-sdt-filter-button-width-sm: 30px;
  --ngx-sdt-filter-button-width-md: 32px;
  --ngx-sdt-filter-button-width-lg: 36px;
}
```

#### Pagination Button Sizes

```css
:root {
  --ngx-sdt-pagination-button-height: 2.25rem;
  --ngx-sdt-pagination-button-min-width: 2.25rem;
  --ngx-sdt-pagination-button-number-min-width: 2.5rem;
}
```

#### Z-Index Layers

```css
:root {
  --ngx-sdt-z-index-dropdown: 50;
  --ngx-sdt-z-index-sticky: 10;
  --ngx-sdt-z-index-overlay: 20;
}
```

#### Skeleton Loading

```css
:root {
  --ngx-sdt-skeleton-color-start: #f1f5f9;
  --ngx-sdt-skeleton-color-mid: #e2e8f0;
  --ngx-sdt-skeleton-color-end: #f1f5f9;
  --ngx-sdt-skeleton-duration: 1.8s;
}
```

#### Icons

```css
:root {
  --ngx-sdt-icon-size-sm: 0.875rem;
  --ngx-sdt-icon-size-base: 1rem;
}
```

## Built-in Themes

### Dark Theme

Apply the dark theme by adding the `ngx-sdt-theme-dark` or `dark-mode` class:

```html
<ngx-simple-datatable class="dark-mode">
  <!-- content -->
</ngx-simple-datatable>
```

Dark theme variables:

```css
.ngx-sdt-theme-dark {
  --ngx-sdt-color-text: #f1f5f9;
  --ngx-sdt-color-text-muted: #94a3b8;
  --ngx-sdt-color-background: #0f172a;
  --ngx-sdt-color-background-gray: #1e293b;
  --ngx-sdt-color-background-gray-hover: #334155;
  --ngx-sdt-color-border: #334155;
  --ngx-sdt-color-border-hover: #475569;
  --ngx-sdt-color-overlay: rgba(15, 23, 42, 0.85);
}
```

### Compact Theme

For smaller, more dense layouts:

```html
<ngx-simple-datatable class="ngx-sdt-theme-compact">
  <!-- content -->
</ngx-simple-datatable>
```

Compact theme variables:

```css
.ngx-sdt-theme-compact {
  --ngx-sdt-spacing-xs: 0.25rem;
  --ngx-sdt-spacing-sm: 0.375rem;
  --ngx-sdt-spacing-md: 0.5rem;
  --ngx-sdt-spacing-lg: 0.75rem;
  --ngx-sdt-cell-padding-normal: 0.625rem 0.875rem;
  --ngx-sdt-font-size-md: 0.8125rem;
  --ngx-sdt-pagination-button-height: 2rem;
}
```

## Framework Compatibility

### Tailwind CSS Integration

```html
<ngx-simple-datatable class="tw-compat">
  <!-- content -->
</ngx-simple-datatable>
```

```css
.ngx-simple-datatable.tw-compat {
  /* Use Tailwind design tokens */
  --ngx-sdt-color-primary: theme('colors.blue.600', #2563eb);
  --ngx-sdt-color-primary-hover: theme('colors.blue.700', #1d4ed8);
  --ngx-sdt-color-primary-light: theme('colors.blue.100', #dbeafe);

  --ngx-sdt-spacing-sm: theme('spacing.2', 0.5rem);
  --ngx-sdt-spacing-md: theme('spacing.3', 0.75rem);
  --ngx-sdt-spacing-lg: theme('spacing.4', 1rem);

  --ngx-sdt-border-radius-md: theme('borderRadius.md', 0.5rem);
  --ngx-sdt-shadow-md: theme('boxShadow.md', 0 4px 6px -1px rgba(0, 0, 0, 0.1));
}
```

### Bootstrap Integration

```html
<ngx-simple-datatable class="bs-compat">
  <!-- content -->
</ngx-simple-datatable>
```

```css
.ngx-simple-datatable.bs-compat {
  /* Use Bootstrap variables */
  --ngx-sdt-color-primary: var(--bs-primary, #0d6efd);
  --ngx-sdt-color-primary-hover: var(--bs-primary-hover, #0b5ed7);
  --ngx-sdt-color-text: var(--bs-body-color, #212529);
  --ngx-sdt-color-background: var(--bs-body-bg, #ffffff);
  --ngx-sdt-color-border: var(--bs-border-color, #dee2e6);
  --ngx-sdt-border-radius-md: var(--bs-border-radius, 0.375rem);
}
```

### Material Design 3

```html
<ngx-simple-datatable class="md-compat">
  <!-- content -->
</ngx-simple-datatable>
```

```css
.ngx-simple-datatable.md-compat {
  /* Material Design 3 tokens */
  --ngx-sdt-color-primary: #6750a4;
  --ngx-sdt-color-primary-hover: #5c43a5;
  --ngx-sdt-color-primary-light: #e7e0ec;
  --ngx-sdt-color-text: #1c1b1f;
  --ngx-sdt-color-background: #fffbfe;

  /* Material elevation shadows */
  --ngx-sdt-shadow-md: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
}
```

## Column Sizing Strategy Variables

For the new intelligent column sizing features:

```css
.ngx-simple-datatable {
  /* Column sizing strategies */
  --ngx-sdt-column-sizing-strategy: auto-fit; /* auto-fit | auto-width | hybrid */
  --ngx-sdt-respect-column-min-widths: false;
  --ngx-sdt-allow-horizontal-scroll: true;
  --ngx-sdt-preserve-readability: true;
}
```

Usage with CSS classes:

```html
<!-- Auto-fit strategy -->
<ngx-simple-datatable class="ngx-sdt-column-sizing-auto-fit">
  <!-- Auto-width strategy -->
  <ngx-simple-datatable class="ngx-sdt-column-sizing-auto-width">
    <!-- Hybrid strategy -->
    <ngx-simple-datatable class="ngx-sdt-column-sizing-hybrid">
      <!-- Respect minimum widths -->
      <ngx-simple-datatable class="ngx-sdt-respect-min-widths">
        <!-- Preserve readability -->
        <ngx-simple-datatable
          class="ngx-sdt-preserve-readability"
        ></ngx-simple-datatable></ngx-simple-datatable></ngx-simple-datatable></ngx-simple-datatable
></ngx-simple-datatable>
```

## Utility Classes

### Layout Utilities

```css
/* Visibility */
.ngx-sdt-utility-hidden {
  display: none !important;
}
.ngx-sdt-utility-invisible {
  visibility: hidden !important;
}
.ngx-sdt-utility-sr-only {
  /* Screen reader only */
}

/* Flexbox */
.ngx-sdt-utility-flex {
  display: flex !important;
}
.ngx-sdt-utility-flex-col {
  flex-direction: column !important;
}
.ngx-sdt-utility-flex-1 {
  flex: 1 1 0% !important;
}
.ngx-sdt-utility-items-center {
  align-items: center !important;
}
.ngx-sdt-utility-justify-between {
  justify-content: space-between !important;
}

/* Spacing */
.ngx-sdt-utility-gap-2 {
  gap: 0.5rem !important;
}
.ngx-sdt-utility-gap-4 {
  gap: 1rem !important;
}
.ngx-sdt-utility-p-2 {
  padding: 0.5rem !important;
}
.ngx-sdt-utility-m-2 {
  margin: 0.5rem !important;
}

/* Text */
.ngx-sdt-utility-text-center {
  text-align: center !important;
}
.ngx-sdt-utility-truncate {
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
```

### Design Utilities

```html
<!-- Remove all borders -->
<ngx-simple-datatable class="no-borders">
  <!-- Remove border radius -->
  <ngx-simple-datatable class="rounded-none">
    <!-- Remove shadows -->
    <ngx-simple-datatable class="no-shadow">
      <!-- Minimal design -->
      <ngx-simple-datatable class="minimal">
        <!-- Dense spacing -->
        <ngx-simple-datatable class="dense">
          <!-- Spacious layout -->
          <ngx-simple-datatable
            class="spacious"
          ></ngx-simple-datatable></ngx-simple-datatable></ngx-simple-datatable></ngx-simple-datatable></ngx-simple-datatable
></ngx-simple-datatable>
```

## Responsive Design

### Breakpoint System

The component uses the following breakpoints:

```css
:root {
  --ngx-sdt-breakpoint-xs: 480px;
  --ngx-sdt-breakpoint-sm: 768px;
  --ngx-sdt-breakpoint-md: 1024px;
  --ngx-sdt-breakpoint-lg: 1280px;
  --ngx-sdt-breakpoint-xl: 1536px;
}
```

### Responsive Variables

Variables automatically adjust based on screen size:

```css
/* Tablet adjustments */
@media (max-width: 1024px) {
  .ngx-sdt-datatable {
    --ngx-sdt-font-size-base: var(--ngx-sdt-font-size-sm);
    --ngx-sdt-cell-padding-normal: var(--ngx-sdt-cell-padding-sm);
  }
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .ngx-sdt-datatable {
    --ngx-sdt-font-size-base: var(--ngx-sdt-font-size-xs);
    --ngx-sdt-cell-padding-normal: var(--ngx-sdt-cell-padding-xs);
  }
}
```

### Mobile Stack Mode

For mobile-friendly table display:

```html
<ngx-simple-datatable class="ngx-sdt-mobile-stack">
  <!-- Automatically stacks on mobile -->
</ngx-simple-datatable>
```

## Accessibility Features

### High Contrast Mode

Automatically adjusts for users with high contrast preferences:

```css
@media (prefers-contrast: high) {
  .ngx-simple-datatable {
    --ngx-sdt-color-border: #000000;
    --ngx-sdt-color-text: #000000;
    --ngx-sdt-color-background: #ffffff;
    --ngx-sdt-color-primary: #0000ff;
  }
}
```

### Reduced Motion

Respects user's motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  .ngx-sdt-datatable *,
  .ngx-sdt-datatable *::before,
  .ngx-sdt-datatable *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus Ring Mixin

```css
.ngx-sdt-focus-ring {
  outline: none;
  border-color: var(--ngx-sdt-color-primary);
  box-shadow: 0 0 0 3px var(--ngx-sdt-color-primary-light);
}
```

## Color Mode Support

### System Preference Detection

```css
@media (prefers-color-scheme: dark) {
  .ngx-simple-datatable:not(.light-mode) {
    /* Auto dark mode variables */
  }
}
```

### Manual Theme Control

```html
<!-- Force light mode -->
<ngx-simple-datatable class="light-mode">
  <!-- Force dark mode -->
  <ngx-simple-datatable class="dark-mode">
    <!-- System preference (default) -->
    <ngx-simple-datatable></ngx-simple-datatable></ngx-simple-datatable
></ngx-simple-datatable>
```

## Component-Specific Theming

### Header Customization

```css
.custom-header {
  --ngx-sdt-header-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --ngx-sdt-header-text-color: white;
  --ngx-sdt-header-font-weight: var(--ngx-sdt-font-weight-bold);
  --ngx-sdt-header-border-width: 0;
  --ngx-sdt-header-hover-transform: translateY(-2px);
}
```

### Checkbox Styling

```css
.custom-checkboxes {
  --ngx-sdt-checkbox-size: 1.25rem;
  --ngx-sdt-checkbox-border-radius: 50%; /* Round checkboxes */
  --ngx-sdt-checkbox-checked-background: #10b981;
  --ngx-sdt-checkbox-hover-transform: scale(1.1);
  --ngx-sdt-checkbox-checked-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
}
```

### Filter Menu Styling

```css
.custom-filters {
  --ngx-sdt-filter-menu-background: rgba(255, 255, 255, 0.95);
  --ngx-sdt-filter-menu-border-radius: 1rem;
  --ngx-sdt-filter-menu-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  --ngx-sdt-filter-menu-backdrop-filter: blur(12px);
  --ngx-sdt-filter-option-hover-transform: translateX(8px);
}
```

### Pagination Styling

```css
.custom-pagination {
  --ngx-sdt-pagination-button-border-radius: 2rem; /* Pill buttons */
  --ngx-sdt-pagination-background: #f8fafc;
  --ngx-sdt-pagination-button-active-background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  --ngx-sdt-pagination-button-hover-transform: translateY(-3px) scale(1.05);
}
```

## External Override System

The component supports external CSS variable overrides:

```css
:root {
  /* External override variables */
  --datatable-primary-color: #10b981;
  --datatable-primary-hover-color: #059669;
  --datatable-primary-light-color: #d1fae5;
  --datatable-border-radius-md: 0.75rem;
  --datatable-width: 100%;
  --datatable-height: 500px;
}
```

## Print Styles

Optimized appearance for printing:

```css
@media print {
  .ngx-sdt-datatable {
    box-shadow: none;
    border: 1px solid #000;
  }

  .ngx-sdt-pagination,
  .ngx-sdt-header__filter-container,
  .ngx-sdt-checkbox {
    display: none;
  }

  .ngx-sdt-table__row {
    page-break-inside: avoid;
  }
}
```

## Advanced Theming Examples

### Corporate Theme

```css
.corporate-theme {
  --ngx-sdt-color-primary: #0f4c75;
  --ngx-sdt-color-primary-hover: #0a3a5c;
  --ngx-sdt-color-primary-light: #e6f2ff;
  --ngx-sdt-color-secondary: #5a6c7d;
  --ngx-sdt-border-radius-md: 0.25rem;
  --ngx-sdt-shadow-md: 0 2px 8px rgba(15, 76, 117, 0.15);
  --ngx-sdt-font-weight-medium: 600;
  --ngx-sdt-header-background: linear-gradient(135deg, #0f4c75 0%, #0a3a5c 100%);
  --ngx-sdt-header-text-color: white;
}
```

### Modern Gradient Theme

```css
.gradient-theme {
  --ngx-sdt-header-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --ngx-sdt-pagination-button-active-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --ngx-sdt-color-primary: #667eea;
  --ngx-sdt-border-radius-lg: 1rem;
  --ngx-sdt-shadow-lg: 0 20px 40px rgba(102, 126, 234, 0.2);
  --ngx-sdt-transition-all: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Glassmorphism Theme

```css
.glass-theme {
  --ngx-sdt-color-background: rgba(255, 255, 255, 0.1);
  --ngx-sdt-color-background-gray: rgba(255, 255, 255, 0.05);
  --ngx-sdt-filter-menu-background: rgba(255, 255, 255, 0.95);
  --ngx-sdt-filter-menu-backdrop-filter: blur(20px);
  --ngx-sdt-pagination-background: rgba(255, 255, 255, 0.1);
  --ngx-sdt-color-border: rgba(255, 255, 255, 0.2);
  --ngx-sdt-shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

### Neon Theme

```css
.neon-theme {
  --ngx-sdt-color-primary: #00ffff;
  --ngx-sdt-color-primary-hover: #00cccc;
  --ngx-sdt-color-primary-light: rgba(0, 255, 255, 0.1);
  --ngx-sdt-color-background: #000011;
  --ngx-sdt-color-text: #ffffff;
  --ngx-sdt-color-border: #00ffff;
  --ngx-sdt-checkbox-checked-shadow: 0 0 0 3px rgba(0, 255, 255, 0.3), 0 0 10px rgba(0, 255, 255, 0.5);
  --ngx-sdt-pagination-button-active-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
}
```

## CSS Architecture

The theming system follows a structured approach:

1. **Base Variables** (`_variables.css`) - Foundation design tokens
2. **Component Mixins** (`_mixins.css`) - Reusable style patterns
3. **Base Styles** (`_base.css`) - Core component structure
4. **Module Styles** - Individual component parts:
   - `_table.css` - Table structure and rows
   - `_header.css` - Header and sorting
   - `_checkbox.css` - Selection checkboxes
   - `_filter.css` - Filtering interface
   - `_pagination.css` - Pagination controls
5. **Responsive Styles** (`_responsive.css`) - Breakpoint adaptations
6. **Main Stylesheet** (`ngx-simple-datatable.css`) - Integration layer

This modular architecture ensures:

- **Performance**: Only necessary styles are loaded
- **Maintainability**: Clear separation of concerns
- **Customization**: Granular control over styling
- **Compatibility**: Framework integration support
- **Accessibility**: Built-in WCAG compliance
- **Responsiveness**: Automatic mobile optimization

## Best Practices

1. **Use CSS Custom Properties** for theme customization rather than overriding classes
2. **Test Accessibility** with high contrast mode and screen readers
3. **Verify Responsive Design** across different screen sizes
4. **Consider Print Styles** for document-heavy applications
5. **Follow Naming Conventions** using the `--ngx-sdt-` prefix for custom variables
6. **Layer Themes Appropriately** using CSS specificity rules
7. **Performance**: Minimize CSS custom property changes during runtime
8. **Framework Integration**: Use appropriate compatibility classes when integrating with design systems
