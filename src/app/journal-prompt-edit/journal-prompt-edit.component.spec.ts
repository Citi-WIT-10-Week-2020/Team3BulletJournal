import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalPromptEditComponent } from './journal-prompt-edit.component';

describe('JournalPromptEditComponent', () => {
  let component: JournalPromptEditComponent;
  let fixture: ComponentFixture<JournalPromptEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalPromptEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalPromptEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
