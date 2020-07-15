import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, AlertService } from '../_services'
import { ThrowStmt } from '@angular/compiler';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-profile-contacts',
  templateUrl: './user-profile-contacts.component.html',
  styleUrls: ['./user-profile-contacts.component.css']
})
export class UserProfileContactsComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  friendList = [];
  returnUrl: string;
    currentUser: any;


  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService
  ) {

    this.currentUser = this.authenticationService.currentUserValue[0];
  }

  ngOnInit() {
      this.friendList = this.currentUser.friends;
      this.loginForm = this.formBuilder.group({
          friendToAdd: ['', Validators.required],
          
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user-profile-contacts';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();
      
      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      console.log(this.f.friendToAdd.value);
      this.loading = true;
      this.authenticationService.getAllUsers()
          //.pipe(first())
          .subscribe(
              data => {
                  console.log(data);
                  this.loading = false;
                  let found = false;
                  
                  for (let user of data){
                      if(user.username == this.f.friendToAdd.value){
                          console.log('Yay we found it');
                          found = true;
                          this.loading = false;
                          console.log(this.currentUser._id);
                          this.authenticationService.addAFriend(this.currentUser._id, this.f.friendToAdd.value)
                              .pipe(first())
                                  .subscribe(
                                      data => {
                                          this.router.navigate([this.returnUrl]);
                                          this.alertService.success("Added Friend to Contacts");
                                          
                                       },
                                      error => {
                                          this.alertService.error(error);
                                          this.loading = false;
                              });
                      }
                  }
                  if(found == false){
                      console.log("No user found :(");
                      this.loading = false;
                      this.alertService.error("No user with that username found");
                  }
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });

              
  }
}
