import promptSync from 'prompt-sync';
import { Product } from '../interface/interface';
import { searchProducts } from '../searchProduct/search';
import { filterPrice, filterCategory, filterRating } from '../filterproduct/filter';
import { addToCart, viewCart } from '../customerCart/cart';

const prompt = promptSync();


function displayProducts(products: Product[]) {
  if (products.length === 0) {
    console.log("No products found.");
    return;
  }
  products.forEach(p => {
    console.log(`ID: ${p.id}, Title: ${p.title}, Price: $${p.price}`);
  });
}

export function customerMenu(products: Product[]) {
  while (true) {
    console.log("\n--- Customer Menu ---");
    console.log("1. Search Product");
    console.log("2. Filter by Price");
    console.log("3. Filter by Category");
    console.log("4. Filter by Rating");
    console.log("5. Add to Cart");
    console.log("6. View Cart");
    console.log("7. Back");

    const choice = prompt("Enter choice: ").trim();

    switch (choice) {
      case "1": {
        const keyword = prompt("Enter keyword (or 'Back'): ").trim();
        if (keyword.toLowerCase() === "back") break;

        const results = searchProducts(products, keyword);
        displayProducts(results);
        break;
      }
      case "2": {
        const priceStr = prompt("Enter max price (or 'Back'): ").trim();
        if (priceStr.toLowerCase() === "back") break;

        const maxPrice = parseFloat(priceStr);
        if (isNaN(maxPrice)) {
          console.log("Invalid price.");
          break;
        }
        const results = filterPrice(products, maxPrice);
        displayProducts(results);
        break;
      }
      case "3": {
        const category = prompt("Enter category (or 'Back'): ").trim();
        if (category.toLowerCase() === "back") break;

        const results = filterCategory(products, category);
        displayProducts(results);
        break;
      }
      case "4": {
        const ratingStr = prompt("Enter minimum rating (or 'Back'): ").trim();
        if (ratingStr.toLowerCase() === "back") break;

        const minRating = parseFloat(ratingStr);
        if (isNaN(minRating)) {
          console.log("Invalid rating.");
          break;
        }
        const results = filterRating(products, minRating);
        displayProducts(results);
        break;
      }
      case "5": {
        const name = prompt("Enter product name to add to cart (or 'Back'): ").trim();
        if (name.toLowerCase() === "back") break;

        addToCart(products, name);
        break;
      }
      case "6":
        viewCart();
        break;

      case "7":
        return;

      default:
        console.log("Invalid option.");
    }
    
  }
}
