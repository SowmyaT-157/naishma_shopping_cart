export interface Rating {
  rate: number;
  count: number;
}
export interface Product {
    id : number;
    title: string;
    price:number;
    category?:string;
    rating?: Rating;
    // description?: string;
}