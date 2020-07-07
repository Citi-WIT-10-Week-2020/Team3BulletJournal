import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileContactsComponent } from './user-profile-contacts.component';

describe('UserProfileContactsComponent', () => {
  let component: UserProfileContactsComponent;
  let fixture: ComponentFixture<UserProfileContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
