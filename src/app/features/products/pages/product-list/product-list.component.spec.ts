import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../../core/models/product.model';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockApiService: ProductService;

  const mockProducts: Product[] = [
    {
      id: '1',
      title: 'Test Product 1',
      description: 'Test description 1',
      price: 29.99,
      image: 'test1.jpg',
      category: 'Electronics'
    },
    {
      id: '2',
      title: 'Test Product 2',
      description: 'Test description 2',
      price: 49.99,
      image: 'test2.jpg',
      category: 'Sports'
    }
  ];

  beforeEach(async () => {
    mockApiService = {
      getProducts: vi.fn(),
      getProductsByCategory: vi.fn(),
      getProductById: vi.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ProductListComponent
      ],
      providers: [
        { provide: ProductService, useValue: mockApiService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have loading state initially', () => {
    expect(component.isLoading()).toBe(true);
    expect(component.products()).toEqual([]);
    expect(component.error()).toBe('');
  });

  it('should load products on initialization', async () => {
    vi.spyOn(mockApiService, 'getProducts').mockReturnValue(of(mockProducts));
    
    fixture.detectChanges();
    await fixture.whenStable();

    expect(mockApiService.getProducts).toHaveBeenCalledOnce();
    expect(component.isLoading()).toBe(false);
    expect(component.products()).toEqual(mockProducts);
    expect(component.error()).toBe('');
  });

  it('should handle API errors gracefully', async () => {
    const errorMessage = 'Failed to load products';
    vi.spyOn(mockApiService, 'getProducts').mockReturnValue(throwError(() => new Error(errorMessage)));
    
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.isLoading()).toBe(false);
    expect(component.products()).toEqual([]);
    expect(component.error()).toBe('Failed to load products');
  });

  it('should filter products by category', async () => {
    const electronicsProducts = mockProducts.filter(p => p.category === 'Electronics');
    vi.spyOn(mockApiService, 'getProductsByCategory').mockReturnValue(of(electronicsProducts));
    
    component.filterByCategory('Electronics');
    await fixture.whenStable();

    expect(mockApiService.getProductsByCategory).toHaveBeenCalledWith('Electronics');
    expect(component.products()).toEqual(electronicsProducts);
    expect(component.selectedCategory()).toBe('Electronics');
  });

  it('should reset to all products when category is cleared', async () => {
    vi.spyOn(mockApiService, 'getProducts').mockReturnValue(of(mockProducts));
    vi.spyOn(mockApiService, 'getProductsByCategory').mockReturnValue(of([]));
    
    // First filter by category
    component.filterByCategory('Electronics');
    await fixture.whenStable();
    
    // Then clear filter
    component.filterByCategory('');
    await fixture.whenStable();

    expect(mockApiService.getProducts).toHaveBeenCalledTimes(2);
    expect(component.products()).toEqual(mockProducts);
    expect(component.selectedCategory()).toBe('');
  });

  it('should render loading state in template', async () => {
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.animate-pulse')).toBeTruthy();
    expect(compiled.textContent).toContain('Loading products...');
  });

  it('should render product grid when products are loaded', async () => {
    vi.spyOn(mockApiService, 'getProducts').mockReturnValue(of(mockProducts));
    
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const productCards = compiled.querySelectorAll('app-product-card');
    expect(productCards.length).toBe(mockProducts.length);
  });

  it('should render error message when API fails', async () => {
    vi.spyOn(mockApiService, 'getProducts').mockReturnValue(throwError(() => new Error('API Error')));
    
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.text-red-500')).toBeTruthy();
    expect(compiled.textContent).toContain('Failed to load products');
  });

  it('should render category filter buttons', async () => {
    vi.spyOn(mockApiService, 'getProducts').mockReturnValue(of(mockProducts));
    
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const categoryButtons = compiled.querySelectorAll('.category-btn');
    expect(categoryButtons.length).toBeGreaterThan(0);
  });

  it('should have proper component styling and structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.container');
    expect(container).toBeTruthy();
    expect(container?.classList.contains('mx-auto')).toBe(true);
    expect(container?.classList.contains('px-4')).toBe(true);
  });
});
