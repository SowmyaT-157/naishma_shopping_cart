import { Product } from "interface/interface";

export const cart: Product[] = [];

export function addToCart(products: Product[], name: string): void {
  const product = products.find(p => p.title.toLowerCase() === name.toLowerCase());
  if (product) {
    cart.push(product);
    console.log(`Added to cart: ${product.title}`);
  } else {
    console.log(` Product not found: ${name}`);
  }

}

export function viewCart(): void {
  if (cart.length === 0) {
    console.log(" Cart is empty.");
    return;
  }

  console.log("Your Cart:");
  cart.forEach(p => {
    console.log(`- ${p.title} ($${p.price})`);
  });
}
