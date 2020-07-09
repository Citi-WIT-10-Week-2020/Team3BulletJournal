import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeChatSelectFriendsComponent } from './coffee-chat-select-friends.component';

describe('CoffeeChatSelectFriendsComponent', () => {
  let component: CoffeeChatSelectFriendsComponent;
  let fixture: ComponentFixture<CoffeeChatSelectFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeChatSelectFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeChatSelectFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
