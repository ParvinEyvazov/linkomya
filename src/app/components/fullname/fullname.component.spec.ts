import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullnameComponent } from './fullname.component';

describe('FullnameComponent', () => {
  let component: FullnameComponent;
  let fixture: ComponentFixture<FullnameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullnameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
