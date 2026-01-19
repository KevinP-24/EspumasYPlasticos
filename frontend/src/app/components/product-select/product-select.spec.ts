import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSelect } from './product-select';

describe('ProductSelect', () => {
  let component: ProductSelect;
  let fixture: ComponentFixture<ProductSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
