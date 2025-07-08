export function getUniqueCategories(products) {
  return [...new Set(products.map(p => p.category))];
}
