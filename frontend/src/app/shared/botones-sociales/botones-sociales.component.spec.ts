import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonesSocialesComponent } from './botones-sociales.component';

describe('BotonesSocialesComponent', () => {
  let component: BotonesSocialesComponent;
  let fixture: ComponentFixture<BotonesSocialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonesSocialesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonesSocialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
