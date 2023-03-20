import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroClubsOrgsComponent } from './intro-clubs-orgs.component';

describe('IntroClubsOrgsComponent', () => {
  let component: IntroClubsOrgsComponent;
  let fixture: ComponentFixture<IntroClubsOrgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroClubsOrgsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroClubsOrgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
