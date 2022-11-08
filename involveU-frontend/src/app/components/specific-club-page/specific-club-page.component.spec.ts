import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificClubPageComponent } from './specific-club-page.component';

describe('SpecificClubPageComponent', () => {
  let component: SpecificClubPageComponent;
  let fixture: ComponentFixture<SpecificClubPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificClubPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificClubPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
