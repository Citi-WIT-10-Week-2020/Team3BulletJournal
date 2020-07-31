import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnyTxtRecord } from 'dns';

@Component({
  selector: 'app-coffee-chat-navbar',
  templateUrl: './coffee-chat-navbar.component.html',
  styleUrls: ['./coffee-chat-navbar.component.css']
})
export class CoffeeChatNavbarComponent implements OnInit {

  href: string;
  currentPage: string;
  themeSelected: any;

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
    if(this.href == '/coffee-chat-profiles'){
      this.currentPage = 'Meeting Profiles'
    }
    else{
      this.currentPage == 'Home'
    }

    this.themeSelected = localStorage.getItem("site-themeC");
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
  }

  colorPink(){
    console.log("pink")
    const htmlTag = document.getElementById("coffeechat")
      htmlTag.setAttribute('data-theme', 'pink');
      localStorage.setItem('site-themeC', 'pink');
  }
  
  colorBlue(){
    console.log("blue")
    const htmlTag = document.getElementById("coffeechat")
      htmlTag.setAttribute('data-theme', 'blue');
      localStorage.setItem('site-themeC', 'blue');
  }
  
  colorGreen(){
    const htmlTag = document.getElementById("coffeechat")
      htmlTag.setAttribute('data-theme', 'green');
      localStorage.setItem('site-themeC', 'green');
  }
  
  colorPurple(){
    const htmlTag = document.getElementById("coffeechat")
      htmlTag.setAttribute('data-theme', 'purple');
      localStorage.setItem('site-themeC', 'purple');
  }
  
  colorOrange(){
    const htmlTag = document.getElementById("coffeechat")
      htmlTag.setAttribute('data-theme', 'orange');
      localStorage.setItem('site-themeC', 'orange');
  }
}
