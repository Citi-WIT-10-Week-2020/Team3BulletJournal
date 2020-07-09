import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import {CommonService} from './common.service';
import {FormGroup, FormControl, Validators, FormsModule} from '@angular/forms';
// import {Http,Response, Headers, RequestOptions } from '@angular/http';

import { AuthenticationService } from './_services';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: any;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        //private newService: CommonService
    ) {
        //this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
       // this.currentUser = this.authenticationService.currentUserValue[0];
    }

    //Repdata;
    //valbutton = "Save";

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
/*
    edit = function(kk){
    this.id = kk._id;
    this.firstName = kk.firstName;
    this.lastName = kk.lastName;
    this.valbutton = "Update";
    
    }
*/
}