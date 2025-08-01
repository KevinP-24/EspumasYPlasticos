import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardViewComponentComponent } from './dashboard-view-component.component';

describe('DashboardViewComponentComponent', () => {
  let component: DashboardViewComponentComponent;
  let fixture: ComponentFixture<DashboardViewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardViewComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardViewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
