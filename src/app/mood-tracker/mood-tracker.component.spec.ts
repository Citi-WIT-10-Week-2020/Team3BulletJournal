import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodTrackerComponent } from './mood-tracker.component';

describe('MoodTrackerComponent', () => {
  let component: MoodTrackerComponent;
  let fixture: ComponentFixture<MoodTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
