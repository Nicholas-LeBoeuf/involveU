import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreTripAgendaComponent } from './pre-trip-agenda.component';

describe('PreTripAgendaComponent', () => {
  let component: PreTripAgendaComponent;
  let fixture: ComponentFixture<PreTripAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreTripAgendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreTripAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
