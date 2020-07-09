import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-profile',
  templateUrl: './user-profile-profile.component.html',
  styleUrls: ['./user-profile-profile.component.css']
})
export class UserProfileProfileComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUserValue[0]
   }

  ngOnInit(): void {
  }

}
