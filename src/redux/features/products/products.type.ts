export type Category = {
  createdAt: string;
  description: string | null;
  id: string;
  image: string;
  name: string;
  updatedAt: string;
}

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

export type Products = Product[];

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
