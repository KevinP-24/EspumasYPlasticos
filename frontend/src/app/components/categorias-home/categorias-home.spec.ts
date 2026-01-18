import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasHome } from './categorias-home';

describe('CategoriasHome', () => {
  let component: CategoriasHome;
  let fixture: ComponentFixture<CategoriasHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriasHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriasHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
