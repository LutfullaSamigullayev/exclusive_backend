export interface CartAddDto {
  product_id: number;
  quantity?: number;
}

export interface CartUpdateDto {
  quantity: number;
}
