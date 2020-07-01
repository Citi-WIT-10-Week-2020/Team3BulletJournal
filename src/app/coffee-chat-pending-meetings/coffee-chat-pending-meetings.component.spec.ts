import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeChatPendingMeetingsComponent } from './coffee-chat-pending-meetings.component';

describe('CoffeeChatPendingMeetingsComponent', () => {
  let component: CoffeeChatPendingMeetingsComponent;
  let fixture: ComponentFixture<CoffeeChatPendingMeetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeChatPendingMeetingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeChatPendingMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
