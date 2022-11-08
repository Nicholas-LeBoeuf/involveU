import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveEboardComponent } from './add-remove-eboard.component';

describe('AddRemoveEboardComponent', () => {
  let component: AddRemoveEboardComponent;
  let fixture: ComponentFixture<AddRemoveEboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRemoveEboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRemoveEboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
