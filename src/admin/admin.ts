// import { displayProducts } from "../fetch"; // corrected path if needed
// import { Product } from "../fetch";
import {  Product, displayProducts,localProducts} from "../fetch"; 
import promptSync from 'prompt-sync';
const prompt = promptSync();

// let items: Product[] = []; 

export function adminMenu() {
  while (true) {
    console.log("\n--- Admin Menu ---");
    console.log("1. Add a Product");
    console.log("2. Remove a Product");
    // console.log("3. Display Products");
    console.log("3. Exit and Show Products");
    console.log("4. Exit Admin Menu");
    const choice = prompt("Select an option: ");

    switch (choice) {
      case "1":
        addProduct();
        break;
      case "2":
        removeProduct();
        break;
      case "3":
        // displayProducts()
        return displayProducts(); 
      case "4":
        return;
      default:
        console.log("Invalid option, try again.");
    }
  }
}

// Example start
// adminMenu();

function addProduct(): void {
  const title = prompt('Enter product title: ');
  const priceStr = prompt('Enter product price: ');
  const category = prompt('Enter category (optional): ');
  const ratingStr = prompt('Enter rating (optional): ');

  const price = parseFloat(priceStr); 
  const rating = ratingStr ? { rate: parseFloat(ratingStr), count: 0 } : undefined;

  if (!title || isNaN(price)) {
    console.log('1Invalid title or price.');
    return;
  }
  
  const nextId = localProducts.length > 0
    ? Math.max(...localProducts.map((p: Product) => p.id))
    : 20;
  
  const newProduct: Product = {
    id: nextId + 1,
    title,
    price,
    category: category || undefined,
    rating,
  };

  localProducts.push(newProduct); 
  console.log(`Product "${title}" added successfully.`);
}

function removeProduct(): void {
  if (localProducts.length === 0) {
    console.log("No products to remove.");
    return;
  }

  console.log("\n--- Products Available for Removal ---");
  localProducts.forEach((product, index) => {
    console.log(`${index + 1}. ID: ${product.id} | Title: ${product.title}`);
  });

  const input = prompt('Enter product ID or title to remove (or type "back" to cancel): ').trim();
  if (input.toLowerCase() === 'back') return;

  const isNumeric = !isNaN(Number(input));
  const identifier = isNumeric ? Number(input) : input.toLowerCase();

  const index = localProducts.findIndex(p =>
    isNumeric ? p.id === identifier : p.title.toLowerCase() === identifier
  );

  removeProduct()

  // localProducts.forEach((product, index) => {
  //   console.log(`${product.id}: ${product.title}`);
  // });

  // const input = prompt('Enter product ID or title to remove (or "Back"): ').trim();
  // if (input.toLowerCase() === 'back') return;

  // const identifier: number | string = isNaN(Number(input)) ? input : Number(input);

  // const index = localProducts.findIndex(p =>
  //   typeof identifier === 'number' ? p.id === identifier : p.title.toLowerCase() === identifier.toLowerCase()
  // );

  if (index !== -1) {
    const removed = localProducts.splice(index, 1)[0];
    console.log(` Product "${removed.title}" removed.`);
  } else {
    console.log(' Product not found.');
  }
}
