import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsiStaffComponent } from './osi-staff.component';

describe('OsiStaffComponent', () => {
  let component: OsiStaffComponent;
  let fixture: ComponentFixture<OsiStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsiStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsiStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
