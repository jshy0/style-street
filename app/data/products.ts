export type Categories =
  | "Tops"
  | "Hoodies"
  | "Bottoms"
  | "Outerwear"
  | "Footwear"
  | "Accessories";

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  badge?: "New" | "Hot";
  category: Categories;
}
