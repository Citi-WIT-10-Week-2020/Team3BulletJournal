import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeChatRandomFriendsComponent } from './coffee-chat-random-friends.component';

describe('CoffeeChatRandomFriendsComponent', () => {
  let component: CoffeeChatRandomFriendsComponent;
  let fixture: ComponentFixture<CoffeeChatRandomFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeChatRandomFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeChatRandomFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
