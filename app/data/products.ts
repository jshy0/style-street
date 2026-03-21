export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  badge?: "New" | "Hot";
  category:
    | "Tops"
    | "Hoodies"
    | "Bottoms"
    | "Outerwear"
    | "Footwear"
    | "Accessories";
}

export const products: Product[] = [
  {
    id: 1,
    name: "Black Washed Hoodie",
    slug: "black-washed-hoodie",
    price: 60,
    image: "/img/black-washed-hoodie.webp",
    badge: "New",
    category: "Hoodies",
  },
  {
    id: 2,
    name: "Green Washed Hoodie",
    slug: "green-washed-hoodie",
    price: 60,
    image: "/img/green-washed-hoodie.webp",
    badge: "New",
    category: "Hoodies",
  },
  {
    id: 3,
    name: "Black Washed Tee",
    slug: "black-washed-tee",
    price: 30,
    image: "/img/black-washed-tee.webp",
    badge: "New",
    category: "Tops",
  },
];
