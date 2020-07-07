import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodTrackerMonthlyChartsComponent } from './mood-tracker-monthly-charts.component';

describe('MoodTrackerMonthlyChartsComponent', () => {
  let component: MoodTrackerMonthlyChartsComponent;
  let fixture: ComponentFixture<MoodTrackerMonthlyChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodTrackerMonthlyChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodTrackerMonthlyChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
