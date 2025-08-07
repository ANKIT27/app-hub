export const CATEGORIES = ['Work', 'Personal', 'Shopping', 'Health']

export const FILTERS = ['all', 'active', 'completed'] as const
export type FilterType = typeof FILTERS[number]
