export interface CategoryCreateDto {
  name: string;
  slug?: string;
  description?: string;
  parent_id?: number;
  is_active?: boolean;
}

export interface CategoryUpdateDto {
  name?: string;
  slug?: string | null;
  description?: string | null;
  parent_id?: number | null;
  is_active?: boolean;
}
