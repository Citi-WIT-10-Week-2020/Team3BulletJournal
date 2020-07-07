import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodTrackerWeeklyChartsComponent } from './mood-tracker-weekly-charts.component';

describe('MoodTrackerWeeklyChartsComponent', () => {
  let component: MoodTrackerWeeklyChartsComponent;
  let fixture: ComponentFixture<MoodTrackerWeeklyChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodTrackerWeeklyChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodTrackerWeeklyChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
