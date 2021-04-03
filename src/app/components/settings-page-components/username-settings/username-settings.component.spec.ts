import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameSettingsComponent } from './username-settings.component';

describe('UsernameSettingsComponent', () => {
  let component: UsernameSettingsComponent;
  let fixture: ComponentFixture<UsernameSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsernameSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsernameSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
