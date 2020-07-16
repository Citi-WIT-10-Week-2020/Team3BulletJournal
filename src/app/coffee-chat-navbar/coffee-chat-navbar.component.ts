import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coffee-chat-navbar',
  templateUrl: './coffee-chat-navbar.component.html',
  styleUrls: ['./coffee-chat-navbar.component.css']
})
export class CoffeeChatNavbarComponent implements OnInit {

  href: string;
  currentPage: string;

  constructor(private router: Router) {}

  ngOnInit(){
    this.href = this.router.url;
    console.log(this.router.url);
    if(this.href == '/coffee-chat-select-friends'){
      this.currentPage = 'Select Friends'
    }
    if(this.href == '/coffee-chat-random-friends'){
      this.currentPage = 'Randomly Generate Friends'
    }
    if(this.href == '/coffee-chat-upcoming-meetings'){
      this.currentPage = 'Upcoming Meetings'
    }
    if(this.href == '/coffee-chat-pending-meetings'){
      this.currentPage = 'Pending Meetings'
    }
    else{
      this.currentPage == 'Home'
    }
  }

}
