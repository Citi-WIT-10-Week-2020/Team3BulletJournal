import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalNavbarComponent } from './journal-navbar.component';

describe('JournalNavbarComponent', () => {
  let component: JournalNavbarComponent;
  let fixture: ComponentFixture<JournalNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
