
import { Product } from "interface/interface";

export function filterPrice(products: Product[], maxPrice: number): Product[] {
  return products.filter(p => p.price <= maxPrice);
}

export function filterCategory(products: Product[], category: string): Product[] {
  return products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
}

export function filterRating(products: Product[], minRating: number): Product[] {
  return products.filter(p => p.rating && p.rating.rate >= minRating);
}