import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubPageComponent } from './club-page.component';

describe('ClubPageComponent', () => {
  let component: ClubPageComponent;
  let fixture: ComponentFixture<ClubPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
