import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-nav-buttons-home',
  templateUrl: './nav-buttons-home.component.html',
  styleUrls: ['./nav-buttons-home.component.css']
})
export class NavButtonsHomeComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUserValue[0]
   }
  ngOnInit(): void {
  }

}
