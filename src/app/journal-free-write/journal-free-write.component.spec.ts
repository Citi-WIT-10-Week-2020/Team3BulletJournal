import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalFreeWriteComponent } from './journal-free-write.component';

describe('JournalFreeWriteComponent', () => {
  let component: JournalFreeWriteComponent;
  let fixture: ComponentFixture<JournalFreeWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalFreeWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalFreeWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
