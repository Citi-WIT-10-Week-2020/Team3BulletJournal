import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-navbar',
  templateUrl: './user-profile-navbar.component.html',
  styleUrls: ['./user-profile-navbar.component.css']
})
export class UserProfileNavbarComponent implements OnInit {
  href: string;
  currentPage: string;
  themeSelected:any;

  constructor(private router: Router) { }

  ngOnInit(){
    this.href = this.router.url;
    console.log(this.router.url);
    if(this.href == '/user-profile'){
      this.currentPage = 'Profile'
    }
    if(this.href == '/user-profile-dashboard'){
      this.currentPage = 'Dashboard'
    }
    if(this.href == '/user-profile-contacts'){
      this.currentPage = 'Contacts'
    }

    this.themeSelected = localStorage.getItem("site-themeU");
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
      this.colorGreen()
    }
  }
  colorPink(){
    console.log("pink")
    const htmlTag = document.getElementById("profile")
      htmlTag.setAttribute('data-theme', 'pink');
      localStorage.setItem('site-themeU', 'pink');
  }

  colorBlue(){
    console.log("blue")
    const htmlTag = document.getElementById("profile")
      htmlTag.setAttribute('data-theme', 'blue');
      localStorage.setItem('site-themeU', 'blue');
  }

  colorGreen(){
    const htmlTag = document.getElementById("profile")
      htmlTag.setAttribute('data-theme', 'green');
      localStorage.setItem('site-themeU', 'green');
  }

  colorPurple(){
    const htmlTag = document.getElementById("profile")
      htmlTag.setAttribute('data-theme', 'purple');
      localStorage.setItem('site-themeU', 'purple');
  }

  colorOrange(){
    const htmlTag = document.getElementById("profile")
      htmlTag.setAttribute('data-theme', 'orange');
      localStorage.setItem('site-themeU', 'orange');
  }
}
