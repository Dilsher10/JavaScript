export function filterProducts(products, { category, maxPrice, keyword }) {
  return products.filter(p => {
    const matchesCategory = !category || p.category === category;
    const matchesPrice = p.price <= maxPrice;
    const matchesKeyword = p.name.toLowerCase().includes(keyword.toLowerCase());
    return matchesCategory && matchesPrice && matchesKeyword;
  });
}
