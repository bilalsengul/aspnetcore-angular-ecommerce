export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    categoryId: number;
    category?: Category;
}

export interface Category {
    id: number;
    name: string;
} 