import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramPlanningChecklistComponent } from './program-planning-checklist.component';

describe('ProgramPlanningChecklistComponent', () => {
  let component: ProgramPlanningChecklistComponent;
  let fixture: ComponentFixture<ProgramPlanningChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramPlanningChecklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramPlanningChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
