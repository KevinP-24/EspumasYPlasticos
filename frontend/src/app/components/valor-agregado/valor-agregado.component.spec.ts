import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorAgregadoComponent } from './valor-agregado.component';

describe('ValorAgregadoComponent', () => {
  let component: ValorAgregadoComponent;
  let fixture: ComponentFixture<ValorAgregadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorAgregadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorAgregadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
