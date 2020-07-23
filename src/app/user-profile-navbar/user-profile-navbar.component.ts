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
  }
}
