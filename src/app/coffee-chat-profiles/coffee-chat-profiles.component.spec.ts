import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeChatProfilesComponent } from './coffee-chat-profiles.component';

describe('CoffeeChatProfilesComponent', () => {
  let component: CoffeeChatProfilesComponent;
  let fixture: ComponentFixture<CoffeeChatProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeChatProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeChatProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
