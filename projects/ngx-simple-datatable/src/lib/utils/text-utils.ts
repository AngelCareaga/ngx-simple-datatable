// projects/ngx-simple-datatable/src/lib/utils/text-utils.ts
export function interpolateText(template: string, params: Record<string, any>): string {
  if (!template || !params) {
    return template || '';
  }

  return template.replace(/\[(\w+)\]/g, (match, key) => {
    const value = params[key];
    return value !== undefined ? String(value) : match;
  });
}

export function formatPaginationText(template: string, start: number, end: number, total: number): string {
  return interpolateText(template, { start, end, total });
}

export function pluralizeText(singular: string, plural: string, count: number): string {
  return count === 1 ? singular : plural;
}

export function interpolateWithPlural(template: string, params: Record<string, any>): string {
  const pluralPattern = /\[(\w+),\s*plural,\s*([^|]+)\|([^\]]+)\]/g;
  let result = template.replace(pluralPattern, (match, countKey, singular, plural) => {
    const count = params[countKey];
    if (count === undefined) return match;
    return count === 1 ? singular.trim() : plural.trim();
  });

  return interpolateText(result, params);
}
