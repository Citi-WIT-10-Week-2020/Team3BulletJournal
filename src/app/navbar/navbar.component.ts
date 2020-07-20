import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, AuthenticationService, AlertService } from '../_services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  currentUser: any;
  returnUrl: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private authenticationService: AuthenticationService
    ) {

        this.currentUser = this.authenticationService.currentUserValue[0];     
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

  ngOnInit() {
  

    this.currentUser = this.authenticationService.currentUserValue[0];     

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

}
