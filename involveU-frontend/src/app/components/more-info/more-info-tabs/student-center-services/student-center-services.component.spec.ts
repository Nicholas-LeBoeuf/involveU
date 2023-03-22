import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCenterServicesComponent } from './student-center-services.component';

describe('StudentCenterServicesComponent', () => {
  let component: StudentCenterServicesComponent;
  let fixture: ComponentFixture<StudentCenterServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCenterServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCenterServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
