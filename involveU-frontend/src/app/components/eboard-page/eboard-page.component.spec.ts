import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EboardPageComponent } from './eboard-page.component';

describe('EboardPageComponent', () => {
  let component: EboardPageComponent;
  let fixture: ComponentFixture<EboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EboardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
