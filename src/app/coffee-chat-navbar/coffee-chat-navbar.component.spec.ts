import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeChatNavbarComponent } from './coffee-chat-navbar.component';

describe('CoffeeChatNavbarComponent', () => {
  let component: CoffeeChatNavbarComponent;
  let fixture: ComponentFixture<CoffeeChatNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeChatNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeChatNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
