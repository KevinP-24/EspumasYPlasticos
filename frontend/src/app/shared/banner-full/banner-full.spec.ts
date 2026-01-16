import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerFull } from './banner-full';

describe('BannerFull', () => {
  let component: BannerFull;
  let fixture: ComponentFixture<BannerFull>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerFull]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerFull);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
