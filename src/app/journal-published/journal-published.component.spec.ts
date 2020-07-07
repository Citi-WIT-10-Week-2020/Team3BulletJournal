import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalPublishedComponent } from './journal-published.component';

describe('JournalPublishedComponent', () => {
  let component: JournalPublishedComponent;
  let fixture: ComponentFixture<JournalPublishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalPublishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalPublishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
