import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coffee-chat-random-friends',
  templateUrl: './coffee-chat-random-friends.component.html',
  styleUrls: ['./coffee-chat-random-friends.component.css']
})
export class CoffeeChatRandomFriendsComponent implements OnInit {

  numberList = ["1", "2", "3", "4", "5"];
  
  ngOnInit(): void {

  }
}
