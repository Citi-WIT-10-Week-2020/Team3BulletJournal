import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-mood-tracker-weekly-charts',
  templateUrl: './mood-tracker-weekly-charts.component.html',
  styleUrls: ['./mood-tracker-weekly-charts.component.css']
})
export class MoodTrackerWeeklyChartsComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUserValue[0]
   }
  ngOnInit(): void {
  }

}
