import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService, AlertService, AuthenticationService } from '../_services';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-coffee-chat-profiles',
  templateUrl: './coffee-chat-profiles.component.html',
  styleUrls: ['./coffee-chat-profiles.component.css']
})
export class CoffeeChatProfilesComponent implements OnInit {
  currentUser: any;
  peopleList = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService) 
  {
    this.currentUser = this.authenticationService.currentUserValue[0];
   }

   ngOnInit(){
    this.peopleList = this.currentUser.friends;
  }
}
