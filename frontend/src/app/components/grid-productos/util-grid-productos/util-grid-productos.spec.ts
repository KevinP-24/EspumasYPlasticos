import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilGridProductos } from './util-grid-productos';

describe('UtilGridProductos', () => {
  let component: UtilGridProductos;
  let fixture: ComponentFixture<UtilGridProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilGridProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilGridProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
