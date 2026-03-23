// Re-export core models for use within the products feature
export type { Product, CartItem } from '../../../core/models/product.model';

// Feature-specific filter type
export interface ProductFilter {
  category: string;
}
