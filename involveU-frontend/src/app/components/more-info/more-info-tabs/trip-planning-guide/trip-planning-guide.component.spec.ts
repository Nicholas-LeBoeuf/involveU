import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPlanningGuideComponent } from './trip-planning-guide.component';

describe('TripPlanningGuideComponent', () => {
  let component: TripPlanningGuideComponent;
  let fixture: ComponentFixture<TripPlanningGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripPlanningGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripPlanningGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
