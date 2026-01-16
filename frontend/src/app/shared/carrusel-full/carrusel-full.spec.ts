import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselFull } from './carrusel-full';

describe('CarruselFull', () => {
  let component: CarruselFull;
  let fixture: ComponentFixture<CarruselFull>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarruselFull]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarruselFull);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
