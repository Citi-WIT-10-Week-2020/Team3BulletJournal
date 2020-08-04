import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { UserService, AuthenticationService, AlertService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: any;
    users = [];
    journalEntry: FormGroup;
    loading = false;
    submitted = false;
    
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService
    ) {
        this.currentUser = this.authenticationService.currentUserValue[0];
    }

    ngOnInit() {
        if (!localStorage.getItem('autoLoad')) { 
            localStorage.setItem('autoLoad', 'no reload') 
            location.reload() 
          } else {
            localStorage.removeItem('autoLoad') 
          }
        this.loadAllUsers();
        this.currentUser = this.authenticationService.currentUserValue[0];
        console.log(this.currentUser)
    }

    deleteUser(id: number) {
        this.authenticationService.delete(id)
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.authenticationService.getAllUsers();
            //.pipe(first())
            //.subscribe(users => this.users = users);
    }

    
    
}