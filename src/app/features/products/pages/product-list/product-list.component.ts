import { Component, OnInit, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  private productsData = signal<Product[]>([]);
  private loading = signal<boolean>(true);
  private errorSignal = signal<string>('');
  private selectedCategorySignal = signal<string>('');

  products = this.productsData.asReadonly();
  isLoading = this.loading.asReadonly();
  error = this.errorSignal.asReadonly();
  selectedCategory = this.selectedCategorySignal.asReadonly();

  categories = computed(() => {
    const allProducts = this.products();
    return [...new Set(allProducts.map(p => p.category))].sort();
  });

  constructor(private apiService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.errorSignal.set('');

    this.apiService.getProducts().subscribe({
      next: (products) => {
        this.productsData.set(products);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.errorSignal.set('Failed to load products');
        this.loading.set(false);
      },
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategorySignal.set(category);
    this.loading.set(true);
    this.errorSignal.set('');

    if (category === '') {
      this.apiService.getProducts().subscribe({
        next: (products) => {
          this.productsData.set(products);
          this.loading.set(false);
        },
        error: () => {
          this.errorSignal.set('Failed to load products');
          this.loading.set(false);
        },
      });
    } else {
      this.apiService.getProductsByCategory(category).subscribe({
        next: (products) => {
          this.productsData.set(products);
          this.loading.set(false);
        },
        error: () => {
          this.errorSignal.set('Failed to load products');
          this.loading.set(false);
        },
      });
    }
  }

  onAddToCart(product: Product): void {
    console.log('Add to cart:', product.title);
    // TODO: wire up CartService
  }
}
