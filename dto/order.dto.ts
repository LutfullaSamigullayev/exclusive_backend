export interface OrderCreateDto {
  payment_method?: string;
  shipping_address?: string;
  note?: string;
}

export interface OrderStatusUpdateDto {
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  payment_status?: "unpaid" | "paid" | "refunded";
}
