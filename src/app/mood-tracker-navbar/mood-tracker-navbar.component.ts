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

  colorPink(){
    console.log("pink")
    const htmlTag = document.getElementById("html")
      htmlTag.setAttribute('data-theme', 'pink');
      localStorage.setItem('site-theme', 'pink');
  }

  colorBlue(){
    console.log("blue")
    const htmlTag = document.getElementById("html")
      htmlTag.setAttribute('data-theme', 'blue');
      localStorage.setItem('site-theme', 'blue');
  }

  colorGreen(){
    const htmlTag = document.getElementById("html")
      htmlTag.setAttribute('data-theme', 'green');
      localStorage.setItem('site-theme', 'green');
  }
}
