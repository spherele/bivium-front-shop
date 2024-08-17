export type CategoryCode =
  | 'equipment'
  | 'clothing'
  | 'womens-clothing'
  | 'womens-ski'
  | 'womens-running'
  | 'mens-clothing'
  | 'mens-ski'
  | 'mens-running'
  | 'childrens-clothing'
  | 'childrens-ski'
  | 'accessories';

export type CategoryName =
  | 'Экипировка'
  | 'Одежда'
  | 'Женская одежда'
  | 'Женские лыжи'
  | 'Женский бег'
  | 'Мужская одежда'
  | 'Мужские лыжи'
  | 'Мужской бег'
  | 'Детская одежда'
  | 'Детские лыжи'
  | 'Акссесуары';

export const categoryMap: Record<CategoryCode, number> = {
  equipment: 27,
  clothing: 28,
  'womens-clothing': 21,
  'womens-ski': 23,
  'womens-running': 22,
  'mens-clothing': 24,
  'mens-ski': 26,
  'mens-running': 25,
  'childrens-clothing': 19,
  'childrens-ski': 20,
  accessories: 18
};

export const categoriesNames: Record<CategoryCode, CategoryName> = {
  equipment: 'Экипировка',
  clothing: 'Одежда',
  'womens-clothing': 'Женская одежда',
  'womens-ski': 'Женские лыжи',
  'womens-running': 'Женский бег',
  'mens-clothing': 'Мужская одежда',
  'mens-ski': 'Мужские лыжи',
  'mens-running': 'Мужской бег',
  'childrens-clothing': 'Детская одежда',
  'childrens-ski': 'Детские лыжи',
  accessories: 'Акссесуары'
};

export const getCatalogCategoryCodeById = (id: number) => {
  return (Object.keys(categoryMap).find(value => categoryMap[value as CategoryCode] === id) as CategoryCode) ?? null;
};

export const getCatalogCategoryNameByCode = (code: CategoryCode) => {
  return categoriesNames[code];
};
