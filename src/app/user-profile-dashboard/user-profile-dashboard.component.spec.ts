import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileDashboardComponent } from './user-profile-dashboard.component';

describe('UserProfileDashboardComponent', () => {
  let component: UserProfileDashboardComponent;
  let fixture: ComponentFixture<UserProfileDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
