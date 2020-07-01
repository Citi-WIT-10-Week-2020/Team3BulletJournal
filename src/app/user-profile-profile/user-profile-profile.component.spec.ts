import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileProfileComponent } from './user-profile-profile.component';

describe('UserProfileProfileComponent', () => {
  let component: UserProfileProfileComponent;
  let fixture: ComponentFixture<UserProfileProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
