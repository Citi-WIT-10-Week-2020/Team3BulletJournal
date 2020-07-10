import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodChosenComponent } from './mood-chosen.component';

describe('MoodChosenComponent', () => {
  let component: MoodChosenComponent;
  let fixture: ComponentFixture<MoodChosenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodChosenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodChosenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
