import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { Product } from '../../../../core/models/product.model';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  const mockProduct: Product = {
    id: '1',
    title: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
    price: 299.99,
    image: 'https://picsum.photos/seed/headphones1/400/300',
    category: 'Electronics',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the product title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Wireless Headphones');
  });

  it('should display the product price formatted to 2 decimal places', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('299.99');
  });

  it('should display the product description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Premium noise-cancelling wireless headphones');
  });

  it('should display the product category badge', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Electronics');
  });

  it('should render an image with the correct src and alt attributes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img') as HTMLImageElement;

    expect(img).toBeTruthy();
    expect(img.src).toContain('picsum.photos');
    expect(img.alt).toBe('Wireless Headphones');
  });

  it('should render an "Add to Cart" button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('[data-testid="add-to-cart-btn"]') as HTMLButtonElement;

    expect(button).toBeTruthy();
    expect(button.textContent?.trim()).toBe('Add to Cart');
  });

  it('should emit addToCart event with the product when button is clicked', () => {
    let emittedProduct: Product | undefined;
    component.addToCart.subscribe((product: Product) => (emittedProduct = product));

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('[data-testid="add-to-cart-btn"]') as HTMLButtonElement;
    button.click();

    expect(emittedProduct).toEqual(mockProduct);
  });

  it('should have a product card container with correct CSS classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('.product-card');

    expect(card).toBeTruthy();
  });
});
