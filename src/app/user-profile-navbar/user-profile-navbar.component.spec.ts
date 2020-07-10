import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileNavbarComponent } from './user-profile-navbar.component';

describe('UserProfileNavbarComponent', () => {
  let component: UserProfileNavbarComponent;
  let fixture: ComponentFixture<UserProfileNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
