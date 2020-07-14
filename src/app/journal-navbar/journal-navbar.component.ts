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

  constructor(private router: Router) {}

  ngOnInit(){
    this.href = this.router.url;
    console.log(this.router.url);
    if(this.href == '/journal-free-write'){
      this.currentPage = 'Free Write'
    }
    if(this.href == '/journal-drafts'){
      this.currentPage = 'Drafts'
    }
    if(this.href == '/journal-published'){
      this.currentPage = 'Published Entries'
    }
    if(this.href == '/journal-prompt'){
      this.currentPage = 'Respond to a Prompt'
    }
    else{
      this.currentPage == 'Home'
    }
  }
}