import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavButtonsHomeComponent } from './nav-buttons-home.component';

describe('NavButtonsHomeComponent', () => {
  let component: NavButtonsHomeComponent;
  let fixture: ComponentFixture<NavButtonsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavButtonsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavButtonsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
