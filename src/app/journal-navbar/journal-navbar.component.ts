import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journal-navbar',
  templateUrl: './journal-navbar.component.html',
  styleUrls: ['./journal-navbar.component.css']
})
export class JournalNavbarComponent implements OnInit {
  href: string;
  currentPage: string;
  themeSelected: any;

  constructor(private router: Router) {}

  ngOnInit(){
    
    this.href = this.router.url;
    console.log(this.router.url);
    if(this.href == '/journal-free-write'){
      this.currentPage = 'Free Write'
    }
    if(this.href == '/journal-published'){
      this.currentPage = 'Previous Entries'
    }
    if(this.href == '/journal-prompt'){
      this.currentPage = 'Respond to a Prompt'
    }
    if(this.href == '/journal'){
      this.currentPage == 'Home'
    }

    this.themeSelected = localStorage.getItem("site-themeJ");
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
      this.colorBlue()
    }
  }

  colorPink(){
    console.log("pink")
    const htmlTag = document.getElementById("journal")
      htmlTag.setAttribute('data-theme', 'pink');
      localStorage.setItem('site-themeJ', 'pink');
  }
  
  colorBlue(){
    console.log("blue")
    const htmlTag = document.getElementById("journal")
      htmlTag.setAttribute('data-theme', 'blue');
      localStorage.setItem('site-themeJ', 'blue');
  }
  
  colorGreen(){
    const htmlTag = document.getElementById("journal")
      htmlTag.setAttribute('data-theme', 'green');
      localStorage.setItem('site-themeJ', 'green');
  }
  
  colorPurple(){
    const htmlTag = document.getElementById("journal")
      htmlTag.setAttribute('data-theme', 'purple');
      localStorage.setItem('site-themeJ', 'purple');
  }
  
  colorOrange(){
    const htmlTag = document.getElementById("journal")
      htmlTag.setAttribute('data-theme', 'orange');
      localStorage.setItem('site-themeJ', 'orange');
  }
}

