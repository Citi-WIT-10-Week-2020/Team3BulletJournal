import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalPromptComponent } from './journal-prompt.component';

describe('JournalPromptComponent', () => {
  let component: JournalPromptComponent;
  let fixture: ComponentFixture<JournalPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
