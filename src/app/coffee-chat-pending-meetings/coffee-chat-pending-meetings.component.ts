import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-coffee-chat-pending-meetings',
  templateUrl: './coffee-chat-pending-meetings.component.html',
  styleUrls: ['./coffee-chat-pending-meetings.component.css']
})
export class CoffeeChatPendingMeetingsComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUserValue[0]
   }
  ngOnInit(): void {
  }

}
