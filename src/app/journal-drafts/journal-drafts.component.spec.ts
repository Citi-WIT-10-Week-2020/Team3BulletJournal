import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalDraftsComponent } from './journal-drafts.component';

describe('JournalDraftsComponent', () => {
  let component: JournalDraftsComponent;
  let fixture: ComponentFixture<JournalDraftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalDraftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalDraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
