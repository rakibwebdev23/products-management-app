// Individual category type
export type Category = {
  createdAt: string;
  description: string | null;
  id: string;
  image: string;
  name: string;
  updatedAt: string;
}

// Individual product type
export type Product = {
  category: Category;
  createdAt: string;
  description: string;
  id: string;
  images: string[];
  name: string;
  price: number;
  slug: string;
  updatedAt: string;
}

// Array of products type
export type Products = Product[];

// Interface syntax:
export interface ICategory {
  createdAt: string;
  description: string | null;
  id: string;
  image: string;
  name: string;
  updatedAt: string;
}

export interface IProduct {
  category: ICategory;
  createdAt: string;
  description: string;
  categoryId: string;
  id: string;
  images: string[];
  name: string;
  price: number;
  slug: string;
  updatedAt: string;
};
