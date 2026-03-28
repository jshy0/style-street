export type Categories =
  | "tops"
  | "hoodies"
  | "bottoms"
  | "outerwear"
  | "footwear"
  | "accessories";

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  badge?: "new" | "hot";
  category: Categories;
}

export const CATEGORIES: Categories[] = [
  "tops",
  "hoodies",
  "bottoms",
  "outerwear",
  "footwear",
  "accessories",
];

export type Badges = "new" | "hot";

export const BADGES: Badges[] = ["new", "hot"];
