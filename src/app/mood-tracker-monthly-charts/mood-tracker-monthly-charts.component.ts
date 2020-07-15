import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-mood-tracker-monthly-charts',
  templateUrl: './mood-tracker-monthly-charts.component.html',
  styleUrls: ['./mood-tracker-monthly-charts.component.css']
})
export class MoodTrackerMonthlyChartsComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUserValue[0]
   }
  ngOnInit(): void {
  }

}
