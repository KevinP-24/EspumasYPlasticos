import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselHalf } from './carrusel-half';

describe('CarruselHalf', () => {
  let component: CarruselHalf;
  let fixture: ComponentFixture<CarruselHalf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarruselHalf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarruselHalf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
