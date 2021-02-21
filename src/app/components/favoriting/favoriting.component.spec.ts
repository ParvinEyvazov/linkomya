import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritingComponent } from './favoriting.component';

describe('FavoritingComponent', () => {
  let component: FavoritingComponent;
  let fixture: ComponentFixture<FavoritingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
