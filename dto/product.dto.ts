export interface ProductCreateDto {
  name: string;
  description?: string;
  price: number;
  stock?: number;
  images?: string[];
  category_id?: number | null;
  brand?: string;
  seller_id?: number;
  is_active?: boolean;
}

export interface ProductUpdateDto {
  name?: string;
  description?: string | null;
  price?: number;
  stock?: number;
  images?: string[] | null;
  category_id?: number | null;
  brand?: string | null;
  seller_id?: number;
  is_active?: boolean;
}
