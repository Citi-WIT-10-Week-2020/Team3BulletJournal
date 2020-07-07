import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeChatUpcomingMeetingsComponent } from './coffee-chat-upcoming-meetings.component';

describe('CoffeeChatUpcomingMeetingsComponent', () => {
  let component: CoffeeChatUpcomingMeetingsComponent;
  let fixture: ComponentFixture<CoffeeChatUpcomingMeetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeChatUpcomingMeetingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeChatUpcomingMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
