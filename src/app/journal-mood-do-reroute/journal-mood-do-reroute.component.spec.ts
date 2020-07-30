import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalMoodDoRerouteComponent } from './journal-mood-do-reroute.component';

describe('JournalMoodDoRerouteComponent', () => {
  let component: JournalMoodDoRerouteComponent;
  let fixture: ComponentFixture<JournalMoodDoRerouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalMoodDoRerouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalMoodDoRerouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
