// projects/ngx-simple-datatable/src/lib/presets/text-presets.ts
import { DatatableTexts } from '../interfaces/datatable-texts.interface';

export const SPANISH_TEXTS: Partial<DatatableTexts> = {
  paginationInfo: 'Mostrando [start] a [end] de [total] [total, plural, elemento|elementos]',
  itemsPerPage: 'Elementos por página',
  noItems: 'No se encontraron [total, plural, elemento|elementos]',
  filterPlaceholder: 'Filtrar...',
  noFilter: 'Sin filtro',
  contains: 'Contiene',
  notContains: 'No contiene',
  equals: 'Igual a',
  notEquals: 'Diferente de',
  startsWith: 'Comienza con',
  endsWith: 'Termina con',
  greaterThan: 'Mayor que',
  greaterThanEqual: 'Mayor o igual que',
  lessThan: 'Menor que',
  lessThanEqual: 'Menor o igual que',
  after: 'Después de',
  before: 'Antes de',
  isEmpty: 'Está vacío',
  isNotEmpty: 'No está vacío',
  booleanTrue: 'Verdadero',
  booleanFalse: 'Falso',
  booleanYes: 'Sí',
  booleanNo: 'No',
  booleanAll: 'Todos',
  noData: 'No hay datos disponibles',
  loading: 'Cargando...',
  search: 'Buscar',
  sortAscending: 'Ordenar ascendente',
  sortDescending: 'Ordenar descendente',
  selectAll: 'Seleccionar todo',
  selectRow: 'Seleccionar fila',
  filterMenu: 'Menú de filtros',
};

export const FRENCH_TEXTS: Partial<DatatableTexts> = {
  paginationInfo: 'Affichage de [start] à [end] sur [total] [total, plural, élément|éléments]',
  itemsPerPage: 'Éléments par page',
  noItems: 'Aucun [total, plural, élément|éléments] trouvé',
  filterPlaceholder: 'Filtrer...',
  noFilter: 'Aucun filtre',
  contains: 'Contient',
  notContains: 'Ne contient pas',
  equals: 'Égal à',
  notEquals: 'Différent de',
  startsWith: 'Commence par',
  endsWith: 'Se termine par',
  greaterThan: 'Supérieur à',
  greaterThanEqual: 'Supérieur ou égal à',
  lessThan: 'Inférieur à',
  lessThanEqual: 'Inférieur ou égal à',
  after: 'Après',
  before: 'Avant',
  isEmpty: 'Est vide',
  isNotEmpty: "N'est pas vide",
  booleanTrue: 'Vrai',
  booleanFalse: 'Faux',
  booleanYes: 'Oui',
  booleanNo: 'Non',
  booleanAll: 'Tous',
  noData: 'Aucune donnée disponible',
  loading: 'Chargement...',
  search: 'Rechercher',
  sortAscending: 'Trier par ordre croissant',
  sortDescending: 'Trier par ordre décroissant',
  selectAll: 'Sélectionner tout',
  selectRow: 'Sélectionner la ligne',
  filterMenu: 'Menu de filtres',
};

export function createDatatableTexts(locale: string): Partial<DatatableTexts> {
  switch (locale) {
    case 'es':
      return SPANISH_TEXTS;
    case 'fr':
      return FRENCH_TEXTS;
    default:
      return {};
  }
}
