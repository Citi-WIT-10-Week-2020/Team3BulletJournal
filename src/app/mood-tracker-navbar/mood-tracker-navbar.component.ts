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

  themeSelected: any;


  constructor(private router: Router) {
    
  }

  ngOnInit(){
    this.href = this.router.url;
    console.log(this.router.url);
    if(this.href == '/mood-tracker-weekly-charts'){
      this.currentPage = 'Weekly Graph'
    }
    if(this.href == '/mood-chosen'){
      this.currentPage = 'Chosen Mood'
    }

    this.themeSelected = localStorage.getItem("site-theme");
    if(this.themeSelected=="blue") {
      this.colorBlue()
    }
    if(this.themeSelected=="pink") {
      this.colorPink()
    }
    if(this.themeSelected=="green") {
      this.colorGreen()
    }
    if(this.themeSelected=="purple") {
      this.colorPurple()
    }
    if(this.themeSelected=="orange") {
      this.colorOrange()
    }
    if(this.themeSelected==null) {
      this.colorPink()
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

  colorPurple(){
    const htmlTag = document.getElementById("html")
      htmlTag.setAttribute('data-theme', 'purple');
      localStorage.setItem('site-theme', 'purple');
  }

  colorOrange(){
    const htmlTag = document.getElementById("html")
      htmlTag.setAttribute('data-theme', 'orange');
      localStorage.setItem('site-theme', 'orange');
  }
  
}
