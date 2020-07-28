import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mood-tracker-navbar',
  templateUrl: './mood-tracker-navbar.component.html',
  styleUrls: ['./mood-tracker-navbar.component.css']
})
export class MoodTrackerNavbarComponent implements OnInit {
  href: string;
  currentPage: string;

  constructor(private router: Router) {}

  ngOnInit(){
    this.href = this.router.url;
    console.log(this.router.url);
    if(this.href == '/mood-tracker-weekly-charts'){
      this.currentPage = 'Weekly Graph'
    }
    if(this.href == '/mood-tracker'){
      this.currentPage == 'Home'
    }
  }
}
