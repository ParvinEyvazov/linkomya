import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignCircleComponent } from './design-circle.component';

describe('DesignCircleComponent', () => {
  let component: DesignCircleComponent;
  let fixture: ComponentFixture<DesignCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
