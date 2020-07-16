import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, AlertService } from '../_services'
import { ThrowStmt } from '@angular/compiler';
import { HttpResponse } from '@angular/common/http';
import { interval } from 'rxjs';

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
  validUser: boolean;
    updateSubscription: any;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService
  ) {

    this.currentUser = this.authenticationService.currentUserValue[0];
    console.log(this.currentUser);
  }

  ngOnInit() {
      //this.friendList = this.currentUser.friends;
      
      this.loginForm = this.formBuilder.group({
          friendToAdd: ['', Validators.required],
          
      });
      if(this.currentUser.friends == undefined){
        window.location.reload();        
      }
      console.log(this.currentUser.friends);

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user-profile-contacts';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;
      this.validUser = true;
      // reset alerts on submit
      this.alertService.clear();
      console.log('hello');
      // stop here if form is invalid
    //   if (this.loginForm.invalid) {
    //       return;
    //   }
    if(this.currentUser.friends !== undefined){
        console.log(this.currentUser.friends);
      for(let user of this.currentUser.friends){
        console.log(user);
      if(this.f.friendToAdd.value == user.username){
          this.validUser = false;
          this.alertService.error("Username already added as a friend!");
      }else if(this.f.friendToAdd.value == this.currentUser.username){
          this.validUser = false;
          this.alertService.error("Don't add yourself as a friend silly!")
      }
    }
    
      this.loading = true;
      this.authenticationService.getAllUsers()
          //.pipe(first())
          .subscribe(
              data => {
                  this.loading = false;
                  let found = false;
                  
                  if(this.validUser == true){
                  for (let user of data){
                      if(user.username == this.f.friendToAdd.value){
                          console.log('Yay we found it');
                          found = true;
                          this.loading = false;
                          this.currentUser.friends.push(user);
                          this.authenticationService.addAFriend(this.currentUser._id, user) //look into pushng whole user
                                  .subscribe(
                                      data => {
                                    
                                          this.router.navigate([this.returnUrl]);
                                          this.alertService.success("Added Friend to Contacts");
                                          //add put request to update
                                       },
                                      error => {
                                          this.alertService.error(error);
                                          this.loading = false;
                              });
                      }
                  }
                }
                  if(found == false && this.validUser == true){
                      console.log("No user found :(");
                      this.loading = false;
                      this.alertService.error("No user with that username found");
                  }
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
            }else{
                console.log('ah')
               
            }
              
  }
    updateStats() {
        throw new Error("Method not implemented.");
    }
}
