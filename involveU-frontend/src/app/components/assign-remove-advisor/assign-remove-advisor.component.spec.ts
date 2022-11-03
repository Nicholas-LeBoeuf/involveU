import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRemoveAdvisorComponent } from './assign-remove-advisor.component';

describe('AssignRemoveAdvisorComponent', () => {
  let component: AssignRemoveAdvisorComponent;
  let fixture: ComponentFixture<AssignRemoveAdvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignRemoveAdvisorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignRemoveAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
