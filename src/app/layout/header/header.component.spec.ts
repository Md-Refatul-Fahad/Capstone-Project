import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HeaderComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should have cartItemCount property', () => {
    expect(component.cartItemCount).toBeDefined();
  });

  it('should render navigation links', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    const productsLink = compiled.querySelector('a[href="/products"]');
    const cartLink = compiled.querySelector('a[href="/cart"]');
    
    expect(productsLink).toBeTruthy();
    expect(cartLink).toBeTruthy();
    expect(productsLink?.textContent).toContain('Products');
    expect(cartLink?.textContent).toContain('Cart');
  });

  it('should display cart item count', () => {
    component.cartItemCount = 5;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const cartBadge = compiled.querySelector('.bg-blue-500');
    
    expect(cartBadge).toBeTruthy();
    expect(cartBadge?.textContent).toContain('5');
  });

  it('should not display cart badge when count is 0', () => {
    component.cartItemCount = 0;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const cartBadge = compiled.querySelector('.bg-blue-500');
    
    expect(cartBadge).toBeFalsy();
  });

  it('should have proper header styling', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const header = compiled.querySelector('header');
    
    expect(header).toBeTruthy();
    expect(header?.classList.contains('bg-white')).toBe(true);
    expect(header?.classList.contains('shadow')).toBe(true);
  });

  it('should have responsive container', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.container');
    
    expect(container).toBeTruthy();
    expect(container?.classList.contains('mx-auto')).toBe(true);
    expect(container?.classList.contains('px-4')).toBe(true);
  });
});
