import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeChatComponent } from './coffee-chat.component';

describe('CoffeeChatComponent', () => {
  let component: CoffeeChatComponent;
  let fixture: ComponentFixture<CoffeeChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
