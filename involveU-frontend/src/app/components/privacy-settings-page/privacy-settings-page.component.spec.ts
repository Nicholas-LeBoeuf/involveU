import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacySettingsPageComponent } from './privacy-settings-page.component';

describe('PrivacySettingsPageComponent', () => {
  let component: PrivacySettingsPageComponent;
  let fixture: ComponentFixture<PrivacySettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacySettingsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacySettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
