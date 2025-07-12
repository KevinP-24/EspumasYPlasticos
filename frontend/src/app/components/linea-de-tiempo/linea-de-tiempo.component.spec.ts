import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaDeTiempoComponent } from './linea-de-tiempo.component';

describe('LineaDeTiempoComponent', () => {
  let component: LineaDeTiempoComponent;
  let fixture: ComponentFixture<LineaDeTiempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineaDeTiempoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineaDeTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
