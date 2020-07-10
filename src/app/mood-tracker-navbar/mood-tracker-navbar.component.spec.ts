import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodTrackerNavbarComponent } from './mood-tracker-navbar.component';

describe('MoodTrackerNavbarComponent', () => {
  let component: MoodTrackerNavbarComponent;
  let fixture: ComponentFixture<MoodTrackerNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodTrackerNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodTrackerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
