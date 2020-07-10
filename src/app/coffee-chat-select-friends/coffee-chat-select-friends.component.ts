import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-coffee-chat-select-friends',
  templateUrl: './coffee-chat-select-friends.component.html',
  styleUrls: ['./coffee-chat-select-friends.component.css'],
})
export class CoffeeChatSelectFriendsComponent implements OnInit {
  currentUser: any;
  peopleList = [];

  constructor(private router: Router,private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue[0];
   }

   ngOnInit(){
    this.peopleList[0] = this.currentUser.friends[0];
    console.log(this.currentUser.friends[0]);
    //this.peopleList[1] = "Sally";
    //this.peopleList[0] = "Jenny";
    /*for(let i = 0; i < 3; i++){
      this.peopleList[i] = "Jenny";
    }*/

   }
}
