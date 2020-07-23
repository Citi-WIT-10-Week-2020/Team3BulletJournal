import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalFreeEditComponent } from './journal-free-edit.component';

describe('JournalFreeEditComponent', () => {
  let component: JournalFreeEditComponent;
  let fixture: ComponentFixture<JournalFreeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalFreeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalFreeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
